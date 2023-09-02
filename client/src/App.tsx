import { FC, useContext, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { UserInterface } from "./models/UserInterface";
import UserService from "./services/UserService";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
    console.log(store.isAuth);
  }, [store]);

  if (store.isLoading) {
    return <h1>Загрузка...</h1>;
  }

  async function getUsers() {
    try {
      const res = await UserService.fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>
        {store.isAuth ? `Авторизован ${store.user.email}` : "Неавторизован"}
      </h1>
      <h1>{store.user.isActivated ? "Подтвержден" : "Подтвердите аккаунт"}</h1>

      {!store.isAuth && <LoginForm />}

      <button onClick={() => store.logout()}>Выйти</button>
      <div>
        <button onClick={() => getUsers()}>Получить пользователей</button>
      </div>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.email}</li>;
        })}
      </ul>
    </div>
  );
};

export default observer(App);
