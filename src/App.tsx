import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import WeddingSpeechBot from "./components/WeddingSpeech/WeddingSpeechBot";
import WeddingSpeechBotResult from "./components/WeddingSpeech/WeddingSpeechBotResult";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wedding-speech-generator" element={<WeddingSpeechBot />} />
      <Route
        path="/wedding-speech-generator/:speechId"
        element={<WeddingSpeechBotResult />}
      />
    </Routes>
  );
};

export default App;
