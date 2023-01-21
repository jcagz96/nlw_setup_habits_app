<br/>

## <a name='technologies'></a> Technologies



- [ReactJS](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Vitejs](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)

<br/>

## Running backend (server)

<br/>

```bash
#Follow the steps below

# Clone this repository
$ git clone https://github.com/jcagz96/nlw_setup_habits_app.git

# From root folder, go to server folder 
$ cd server

# Install dependencies
$ npm i
# or
$ yarn

# run server
$ npm run dev
# or
$ yarn dev

# generate ERD diagram
$ npx prisma generate

# run migrations and populate table with data from file seed.ts
npx prisma migrate dev 

# Access server endpoint
http://localhost:3333
```

<!-- vscode-markdown-toc -->

[API reference](#apireference)

<!-- vscode-markdown-toc -->

## Running Front-End (web)

```bash
# From root folder, go to web folder 
$ cd web

# Install dependencies
$ npm i
# or
$ yarn

# run web app
$ npm run dev
# or
$ yarn dev

# Access web app
http://localhost:5173

```

## Mobile


```bash
# From root folder, go to mobile folder 
$ cd mobile

# Install dependencies
$ npm i
# or
$ yarn

# run mobile app
$ npm run start
# or
$ yarn start
```

<br/>

## <a name='apireference'></a> API REFERENCE

**Get habits summary**

```bash
GET /summary
```

**Get possible and completed, habits given a date**

```bash
GET /day?{date}
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `date`    | `string` | Possible habits date |

**Change a specific habit state**

```bash
PATCH /habits/{id}/toggle
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | Habit Id |

**Create habit**

```bash
POST /habits
```

JSON body `JSON`

```js
{
  "title": "Study 2 hours",
  "weekDays": [0, 1, 5]
}
```

| Key      | Type     | Description                                   |
| :--------- | :------- | :------------------------------------------ |
| `title`    | `string` | Habit title               |
| `weekDays` | `array`  | Numeric array with representing days of the week |

---