import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import WeddingSpeechBotInput from "./components/WeddingSpeech/WeddingSpeechBotInput";
import WeddingSpeechBotResult from "./components/WeddingSpeech/WeddingSpeechBotResult";
import EssayWriterBotInput from "./components/EssayWriter/EssayWriterBotInput";
import EssayWriterBotResult from "./components/EssayWriter/EssayWriterBotResult";
import GrammarFixerBotInput from "./components/GrammarFixer/GrammarFixerBotInput";
import GrammarFixerBotResult from "./components/GrammarFixer/GrammarFixerBotResult";
import ContentShortenerBotInput from "./components/ContentShortener/ContentShortenerBotInput";
import ContentShortenerBotResult from "./components/ContentShortener/ContentShortenerBotResult";
import ArticleRewriterBotInput from "./components/ArticleRewriter/ArticleRewriterBotInput";
import ArticleRewriterBotResult from "./components/ArticleRewriter/ArticleRewriterBotResult";
import EmailWriterBotInput from "./components/EmailWriter/EmailWriterBotInput";
import EmailWriterBotResult from "./components/EmailWriter/EmailWriterBotResult";
import CoverLetterGeneratorBotInput from "./components/CoverLetterGenerator/CoverLetterGeneratorBotInput";
import CoverLetterGeneratorBotResult from "./components/CoverLetterGenerator/CoverLetterGeneratorBotResult";

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

      <Route path="/content-shortener" element={<ContentShortenerBotInput />} />
      <Route
        path="/content-shortener/:rewrittenArticleId"
        element={<ContentShortenerBotResult />}
      />

      <Route path="/article-rewriter" element={<ArticleRewriterBotInput />} />
      <Route
        path="/article-rewriter/:rewrittenArticleId"
        element={<ArticleRewriterBotResult />}
      />

      <Route path="/email-writer" element={<EmailWriterBotInput />} />
      <Route
        path="/email-writer/:emailContentId"
        element={<EmailWriterBotResult />}
      />

      <Route
        path="/cover-letter-generator"
        element={<CoverLetterGeneratorBotInput />}
      />
      <Route
        path="/cover-letter-generator/:coverLetterId"
        element={<CoverLetterGeneratorBotResult />}
      />
    </Routes>
  );
};

export default App;
