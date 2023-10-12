## Next.js Open Jira App
First, ensure that you have the mongo db instace running in your environment:

```
docker-compse up -d
```

*MongoDB URL local:
```
mongodb://localhost:27017/entriesdb
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Configurar las variables de entorno
Rename the file __.env.sample__ to __.env__ and fill al the fields

## Llenar la base de datos con info de pruebas
Llamar:
```
http://localhost:3000/api/seed
```