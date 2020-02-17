const fillTemplate = data => ({
  subject: `Спасибо, что вы с нами! Ваш индивидуальный номер клиента ${data.id}`,
  html: '',
  text: `
Здравствуйте, ${data.account.lastName} ${data.account.firstName}! 
Спасибо за регистрацию на сайте kharkov.hh.ua! 
Номер Вашей заявки ${data.id}. 

Данные для входа в Ваш рабочий кабинет: 
${data.account.email} - логин 
${data.password} - пароль 

В своем рабочем кабинете Вы найдете подсказки для работы с kharkov.hh.ua, а также контакты Службы поддержки kharkov.hh.ua 

С уважением, 
Отдел по работе с клиентами kharkov.hh.ua 
_________________ 
Если у Вас появились вопросы уже сейчас, задайте их по e-mail: registration@hh.ua 
`,
});

export default fillTemplate;
