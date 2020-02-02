# [README.md]()

## Описание репозитория

В данном репозитории лежит исходный код игры "Крестики-нолики" на React, написанной [по обучающему материалу из официальной документации](https://ru.reactjs.org/tutorial/tutorial.html).

Впоследствии проект мигрировал на Typescript, и был написан продакшн сервер на GO.

## Требования

- Node >= 8.10
- Golang >= 1.10

## Запуск

### Подготовка

После скачивания репозитория, в корневой папке создать папку dist

```bash
mkdir dist
```

И установить все необходимые зависимости

```bash
npm install
```

### При разработке
```bash
npm run serve
```

### В продакшене
```bash
npm run build
go build server.go
server --p <portnumber> --ddir <your dist dir>
```