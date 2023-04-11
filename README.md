# Тестовое задание
Привет!

Если ты это читаешь, значит ты получил возможность проверить свои знания и показать нам на что ты способен. Поздраляю!

Для выполнения этого задания тебе надо будет сделать web-интерфейс для спсика с контактами.
Но давай по порядку.

## Подготовка к выполнению

Первое что тебе нужно сделать - это форкнуть этот репозиторий а потом склонировать себе на рабочую машину свой форк.

Дале тебе надо с помощью `docker compose` поднять сервер, накотором уже есть работающий `BackEnd`
<details>
<summary>Как это сдеать</summary> 

```bash
docker compose up --build
```
</details>

Сделав это у тебя подниметься сервер с приложением на `php` и базой данных `MySql`. Сервер слушает на `8180` порту, проверь, что все работает.

<details>
<summary>Как это сдеать</summary> 

```bash
curl localhost:8180/
```

</details>

<details>
<summary>Ответ сервера</summary> 

```json
{"total":3,"data":[{"id":"1","fname":"Tom","lname":"Hanks","phone":"+1123456789","bday":"1956-07-09"},{"id":"2","fname":"Will","lname":"Smith","phone":"+1987654321","bday":"1968-09-25"},{"id":"3","fname":"Bruce","lname":"Willis","phone":"+1147258396","bday":"1955-03-19"}]}
```
</details>

На этом подготовка закончена, изучи [API сервера](https://github.com/diliapi/test_job/tree/frontend#api) можно приступать к выполнению [задания](https://github.com/diliapi/test_job/tree/frontend#задание)


## API

### GET

paht `/`

params:
```http
- id: int|null
- page: int|null default=0 
- items: int|null default=10
```

response
```json
{
    "total": int
    "data": [
        {
            "id": int,
            "fname": string,
            "lname": string,
            "phone": string,
            "bday": string
        }
	]
}
```

### POST

paht `/`

params:
```json
{
    "fname": string,
    "lname": string,
    "phone": string,
    "bday": string
}
```

response
```json
{
    "success": bool,
    "message": string|nil
}
```
### PUT

paht `/`

params:
```json
{
    "id": int,
    "fname": string|nil,
    "lname": string|nil,
    "phone": string|nil,
    "bday": string|nil
}
```

response
```json
{
    "success": bool,
    "message": string|nil
}
```

### DELETE

paht `/`

params:
```json
{
    "id": int
}
```

response
```json
{
    "success": bool,
    "message": string|nil
}
```
## Задание
Для выполнения этого задания тебе надо написать web-интерфейс для существующего бэкэнда.

Обязательные условия выполнения:

1. Фронт должен быть написан на `React.js`
2. Фронт должен реализовывать все методы  `API`
3. Web-интерфейс должен имплементировать `SPA`

Желательные уловия выполнения:

1. Интегрировать в проект `docker container` с фронтом
2. Соблюдение принципов `Git Flow`
3. Покрытие кода `Unit-тестами`

## Что делать когда выполнишь задание

Что бы я мог проверить то, что ты сделал, просто сделай `pull request` на оригинальный репозиторий в текущую ветку
