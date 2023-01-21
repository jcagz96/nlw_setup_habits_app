import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs';
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";
import clsx from "clsx";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
    amount: number;
    completed: number;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as Params;


  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0;

  async function fetchHabits() {

    try {
      setLoading(true);
      const response = await api.get<DayInfoProps>(`/day`, { params: { date } });
      console.log(response.data);
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits);

    } catch (error) {
      console.log(error);
      Alert.alert('OPS', 'Não foi possivel carregar as informações dos hábitos');
    }
    finally {
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      }
      else {
        setCompletedHabits(prevState => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("OPS", "Não foi possível atualizar o estado do hábito");
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }


  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <BackButton />

        <Text
          className="mt-6 text-zinc-400 font-semibold text-base lowercase"
        >
          {dayOfWeek}
        </Text>
        <Text
          className="mt-6 text-white font-extrabold text-3xl"
        >
          {dayAndMonth}
        </Text>

        <ProgressBar
          progress={habitsProgress}
        />
        <View className={clsx("mt-6", {
          ["opacity-50"]: isDateInPast
        })}>
          {
            dayInfo?.possibleHabits && dayInfo!.possibleHabits.length > 0 ?
              dayInfo.possibleHabits.map(habit => (
                <Checkbox
                  key={habit.id}
                  title={habit.title}
                  disabled={isDateInPast}
                  checked={completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                />
              ))
              :
              <HabitsEmpty />
          }
        </View>

        {
          isDateInPast && (
            <Text
              className="text-white mt-10 text-center"
            >
              Não podes editar hábitos do passado
            </Text>
          )

        }

      </ScrollView>
    </View>
  );
}