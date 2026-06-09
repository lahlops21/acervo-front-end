import { registerRootComponent } from "expo"; // Importa a função que registra o componente raiz no Expo.
import App from "./src/App"; // Importa o componente principal do app.

registerRootComponent(App); // Diz ao Expo: "este é o componente inicial, renderize ele primeiro".
