import CatFactComponent from "./components/CatFactComponent";
import PersonAgeComponent from "./components/PersonAgeComponent";
import '@vkontakte/vkui/dist/vkui.css';
import { Header } from "@vkontakte/vkui";

function App() {
  return (
    <div className="App">
      <Header mode="primary" size="large" >Узнайте факты о кошках</Header>
      <CatFactComponent />
      <Header mode="primary" size="large" >Узнайте ваш возраст по имени</Header>
      <PersonAgeComponent />
    </div >
  );
}

export default App;
