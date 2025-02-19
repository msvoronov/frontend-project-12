export default {
  translation: {
    errors: {
      networkError: 'Ошибка сети. Проверьте подключение',
      fetchError: 'Ошибка загрузки данных',
    },
    navbar: {
      logout: 'Выйти',
    },
    chat: {
      channels: 'Каналы',
      management: 'Управление каналом',
      remove: 'Удалить',
      rename: 'Переименовать',
      message_one: 'сообщение',
      message_few: 'сообщения',
      message_many: 'сообщений',
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
    },
    login: {
      enter: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      feedback: 'Неверные имя пользователя или пароль',
      noAccount: 'Нет аккаунта? ',
      registration: 'Регистрация',
    },
    notFound: {
      title: 'Страница не найдена',
      goTo: 'Но вы можете перейти ',
      toMainPage: 'на главную страницу',
    },
    signup: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      send: 'Зарегистрироваться',
      hasAccount: 'Уже есть аккаунт? ',
      enter: 'Войти',
      schema: {
        required: 'Обязательное поле',
        min3: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        max20: 'От 3 до 20 символов',
        mustMatch: 'Пароли должны совпадать',
      },
      errors: {
        alreadyExists: 'Такой пользователь уже существует',
      },

    },
    add: {
      title: 'Добавить канал',
      name: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
      created: 'Канал создан',
      schema: {
        required: 'Обязательное поле',
        min3: 'От 3 до 20 символов',
        max20: 'От 3 до 20 символов',
        mustUnique: 'Должно быть уникальным',
      },
    },
    remove: {
      title: 'Удалить канал',
      confirmation: 'Уверены?',
      cancel: 'Отменить',
      send: 'Удалить',
      removed: 'Канал удалён',
    },
    rename: {
      title: 'Переименовать канал',
      name: 'Имя канала',
      cancel: 'Отменить',
      send: 'Отправить',
      renamed: 'Канал переименован',
      schema: {
        required: 'Обязательное поле',
        min3: 'От 3 до 20 символов',
        max20: 'От 3 до 20 символов',
        mustUnique: 'Должно быть уникальным',
      },
    },
  },
};
