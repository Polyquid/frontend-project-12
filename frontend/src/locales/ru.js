const ru = {
  translation: {
    header: {
      title: 'Hexlet chat',
      signedAs: 'Вошли как: ',
      exit: 'Выйти',
    },
    errorPage: {
      title: 'Упс!',
      notFound: 'Страница не найдена',
      goMain: {
        text: 'Но вы можете перейти ',
        link: 'на главную страницу',
      },
    },
    login: {
      title: 'Войти',
      noAccount: 'Нет аккаунта?',
      signupLink: 'Регистрация',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
        errors: {
          required: 'Обязательно для заполнения',
          invalidRequest: 'Неверные имя пользователя или пароль',
        },
      },
    },
    signup: {
      title: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Регистрация',
        errors: {
          required: 'Обязательно для заполнения',
          usernameLength: 'От 3 до 20 символов',
          passwordLength: 'Не менее 6 символов',
          confirmPassword: 'Пароли должны совпадать',
          invalidRequest: 'Такой пользователь уже существует',
        },
      },
    },
    chat: {
      channels: {
        title: 'Каналы',
        removeButton: 'Удалить',
        renameButton: 'Переименовать',
        addButton: '+',
        marker: '#',
      },
      messages: {
        marker: '#',
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
        form: {
          newMessage: 'Введите сообщение...',
        },
      },
      notifications: {
        add: 'Канал создан',
        remove: 'Канал удалён',
        rename: 'Канал переименован',
        errors: {
          network: 'Ошибка соединения',
          server: 'Ошибка загрузки данных',
          unknown: 'Неизвестная ошибка',
          parsing: 'Ошибка загрузки данных',
        },
      },
      modals: {
        add: {
          title: 'Добавить канал',
          form: {
            name: 'Имя канала',
            submit: 'Отправить',
            cancel: 'Отменить',
            errors: {
              required: 'Обязательное поле',
              length: 'От 3 до 20 символов',
              uniq: 'Должно быть уникальным',
            },
          },
        },
        remove: {
          title: 'Удалить канал',
          description: 'Уверены?',
          submit: 'Удалить',
          cancel: 'Отменить',
        },
        rename: {
          title: 'Переименовать канал',
          form: {
            name: 'Новое имя канала',
            submit: 'Отправить',
            cancel: 'Отменить',
            errors: {
              required: 'Обязательное поле',
              length: 'От 3 до 20 символов',
              uniq: 'Должно быть уникальным',
            },
          },
        },
      },
    },
  },
};

export default ru;
