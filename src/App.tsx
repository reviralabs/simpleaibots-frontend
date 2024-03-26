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
import ExcelFormulaGeneratorBotInput from "./components/ExcelFormulaGenerator/ExcelFormulaGeneratorBotInput";
import ExcelFormulaGeneratorBotResult from "./components/ExcelFormulaGenerator/ExcelFormulaGeneratorBotResult";
import LinkedinPostGeneratorInput from "./components/LinkedinPostGenerator/LinkedinPostGeneratorInput";
import LinkedinPostGeneratorResult from "./components/LinkedinPostGenerator/LinkedinPostGeneratorResult";
import YoutubeDescriptionGeneratorInput from "./components/YoutubeDescriptionGenerator/YoutubeDescriptionGeneratorInput";
import YoutubeDescriptionGeneratorResult from "./components/YoutubeDescriptionGenerator/YoutubeDescriptionGeneratorResult";
import PerformanceReviewGeneratorInput from "./components/PerformanceReviewGenerator/PerformanceReviewGeneratorInput";
import PerformanceReviewGeneratorResult from "./components/PerformanceReviewGenerator/PerformanceReviewGeneratorResult";
import RealEstateDescriptionGeneratorInput from "./components/RealEstateDescriptionGenerator/RealEstateDescriptionBotInput";
import RealEstateDescriptionGeneratorResult from "./components/RealEstateDescriptionGenerator/RealEstateDescriptionBotResult";
import Blog from "./components/Blog/Blog";

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
        path="/content-shortener/:contentShortenerContentId"
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

      <Route
        path="/excel-formula-generator"
        element={<ExcelFormulaGeneratorBotInput />}
      />
      <Route
        path="/excel-formula-generator/:excelFormulaId"
        element={<ExcelFormulaGeneratorBotResult />}
      />

      <Route
        path="/linkedin-post-generator"
        element={<LinkedinPostGeneratorInput />}
      />
      <Route
        path="/linkedin-post-generator/:linkedinPostId"
        element={<LinkedinPostGeneratorResult />}
      />

      <Route
        path="/youtube-description-generator"
        element={<YoutubeDescriptionGeneratorInput />}
      />
      <Route
        path="/youtube-description-generator/:youtubeDescriptionId"
        element={<YoutubeDescriptionGeneratorResult />}
      />

      <Route
        path="/performance-review-generator"
        element={<PerformanceReviewGeneratorInput />}
      />
      <Route
        path="/performance-review-generator/:performanceReviewId"
        element={<PerformanceReviewGeneratorResult />}
      />

      <Route
        path="/realestate-description-generator"
        element={<RealEstateDescriptionGeneratorInput />}
      />
      <Route
        path="/realestate-description-generator/:realEstateDescriptionId"
        element={<RealEstateDescriptionGeneratorResult />}
      />

      <Route path="/blogs/:blogName" element={<Blog />} />
    </Routes>
    // New comment
  );
};

export default App;
