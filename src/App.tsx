import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import WeddingSpeechBotInput from "./components/WeddingSpeech/WeddingSpeechBotInput";
import WeddingSpeechBotResult from "./components/WeddingSpeech/WeddingSpeechBotResult";
import EssayWriterBotInput from "./components/EssayWriter/EssayWriterBotInput";
import EssayWriterBotResult from "./components/EssayWriter/EssayWriterBotResult";
import GrammarFixerBotInput from "./components/GrammarFixer/GrammarFixerBotInput";
import GrammarFixerBotResult from "./components/GrammarFixer/GrammarFixerBotResult";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/wedding-speech-generator"
        element={<WeddingSpeechBotInput />}
      />
      <Route
        path="/wedding-speech-generator/:speechId"
        element={<WeddingSpeechBotResult />}
      />
      <Route path="/essay-writer" element={<EssayWriterBotInput />} />
      <Route path="/essay-writer/:essayId" element={<EssayWriterBotResult />} />

      <Route path="/grammar-fixer" element={<GrammarFixerBotInput />} />
      <Route
        path="/grammar-fixer/:grammarFixerContentId"
        element={<GrammarFixerBotResult />}
      />
    </Routes>
  );
};

export default App;
