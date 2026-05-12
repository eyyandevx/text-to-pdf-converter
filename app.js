

const { jsPDF } = window.jspdf;

function App() {

  const [text, setText] = React.useState("");
  const [fontSize, setFontSize] = React.useState(16);
  const [fontFamily, setFontFamily] = React.useState("Helvetica");
  const [fileName, setFileName] = React.useState("neopdf-document");

  const wordCount = text.trim() === ""
    ? 0
    : text.trim().split(/\s+/).length;

  const characterCount = text.length;

  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const exportPDF = () => {

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    doc.setFont(fontFamily.toLowerCase());
    doc.setFontSize(fontSize);

    const margin = 15;

    const pageWidth = doc.internal.pageSize.getWidth();

    const wrappedText = doc.splitTextToSize(
      text,
      pageWidth - margin * 2
    );

    let cursorY = 20;

    wrappedText.forEach((line) => {

      if (cursorY > 280) {
        doc.addPage();
        cursorY = 20;
      }

      doc.text(line, margin, cursorY);

      cursorY += fontSize * 0.45;
    });

    doc.save(`${fileName}.pdf`);
  };

  const clearEditor = () => {
    setText("");
  };

  const insertDate = () => {
    const today = new Date().toLocaleDateString();

    setText(prev =>
      prev + `\n${today}`
    );
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <i className="fa-solid fa-file-pdf"></i>
          <h1>NeoPDF Editor</h1>
        </div>

        <div className="status">
          ● System Online
        </div>

      </nav>

      {/* MAIN */}
      <div className="main-grid">

        {/* SIDEBAR */}
        <aside className="sidebar">

          <h2>Document Settings</h2>

          <div className="control-group">
            <label>File Name</label>

            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Font Size</label>

            <select
              value={fontSize}
              onChange={(e) =>
                setFontSize(Number(e.target.value))
              }
            >
              <option value="12">12px</option>
              <option value="14">14px</option>
              <option value="16">16px</option>
              <option value="18">18px</option>
              <option value="22">22px</option>
              <option value="26">26px</option>
            </select>
          </div>

          <div className="control-group">
            <label>Font Family</label>

            <select
              value={fontFamily}
              onChange={(e) =>
                setFontFamily(e.target.value)
              }
            >
              <option>Helvetica</option>
              <option>Courier</option>
              <option>Times</option>
            </select>
          </div>

          {/* STATS */}
          <div className="stats">

            <div className="stat-box">
              <span>Words</span>
              <strong>{wordCount}</strong>
            </div>

            <div className="stat-box">
              <span>Characters</span>
              <strong>{characterCount}</strong>
            </div>

            <div className="stat-box">
              <span>Read Time</span>
              <strong>{estimatedReadTime}m</strong>
            </div>

            <div className="stat-box">
              <span>Pages</span>
              <strong>
                {Math.max(1, Math.ceil(wordCount / 500))}
              </strong>
            </div>

          </div>

          <button
            className="download-btn"
            onClick={exportPDF}
          >
            <i className="fa-solid fa-download"></i>
            &nbsp;
            Export PDF
          </button>

        </aside>

        {/* WORKSPACE */}
        <section className="workspace">

          {/* EDITOR */}
          <div className="editor">

            <div className="panel-header">

              <h2>Editor</h2>

              <div className="toolbar">

                <button
                  className="tool-btn"
                  onClick={insertDate}
                >
                  <i className="fa-solid fa-calendar"></i>
                </button>

                <button
                  className="tool-btn"
                  onClick={clearEditor}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>

              </div>

            </div>

            <textarea
              placeholder="Start typing your document here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily
              }}
            />

          </div>

          {/* PREVIEW */}
          <div className="preview-panel">

            <div className="panel-header">
              <h2>Live Preview</h2>
            </div>

            <div
              className="preview-content"
              style={{
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily
              }}
            >
              {
                text ||
                "Your live document preview appears here..."
              }
            </div>

          </div>

        </section>

      </div>

      <footer className="footer">
        NeoPDF Editor • React + jsPDF • Responsive UI
      </footer>

    </div>
  );
}

ReactDOM
  .createRoot(document.getElementById("root"))
  .render(<App />);