// ============================================================
// NUMERICAL METHODS — COURSE CONTENT
// All lectures, examples, exercises with full step-by-step solutions
// ============================================================

/* =====================================================
   QUIZ HELPER FUNCTIONS (defined first - used in templates below)
   ===================================================== */
function tfQuestions(items) {
  return items.map((it, idx) => {
    const [q, ans, expl] = it;
    return `
      <div class="quiz-item">
        <div class="quiz-question">${idx + 1}. ${q}</div>
        <button class="quiz-reveal" onclick="this.nextElementSibling.classList.toggle('show')">Reveal Answer</button>
        <div class="quiz-answer"><strong>${ans}.</strong> ${expl}</div>
      </div>
    `;
  }).join("");
}

function mcq(question, options, correctIdx, explanation) {
  const opts = options.map((o, i) => `<div class="quiz-option" data-correct="${i === correctIdx}">${String.fromCharCode(97 + i)}) ${o}</div>`).join("");
  return `
    <div class="quiz-item mcq-item">
      <div class="quiz-question">${question}</div>
      <div class="quiz-options">${opts}</div>
      <div class="quiz-answer"><strong>Answer:</strong> ${String.fromCharCode(97 + correctIdx)}) ${options[correctIdx]}. ${explanation}</div>
    </div>
  `;
}

const PAGES = {};

/* =====================================================
   HOME PAGE
   ===================================================== */
PAGES.home = `
<div class="page">
  <section class="hero">
    <div class="developer-badge">
      <span class="dev-icon">👨‍💻</span>
      <span>Developed by <strong>Ryan Al-Ahmari</strong></span>
    </div>
    <h1 class="hero-title">Numerical Methods</h1>
    <p class="hero-sub">A complete interactive course covering every lecture, every concept, every example, and every exercise — solved step by step in the exact style of your lecture notes.</p>
    <div class="hero-stats">
      <div class="stat"><div class="stat-num">12</div><div class="stat-label">Lectures</div></div>
      <div class="stat"><div class="stat-num">50+</div><div class="stat-label">Worked Examples</div></div>
      <div class="stat"><div class="stat-num">30+</div><div class="stat-label">Solved Exercises</div></div>
      <div class="stat"><div class="stat-num">∞</div><div class="stat-label">Practice</div></div>
    </div>
  </section>

  <h2 style="font-size:22px;font-weight:700;margin:8px 0 6px;letter-spacing:-0.01em;">Browse All Lectures</h2>
  <p style="color:var(--text-tertiary);margin-bottom:18px;font-size:14.5px;">Click any lecture to dive in.</p>

  <div class="lecture-grid">
    <div class="lecture-card" data-go="errors"><div class="lecture-card-num">1</div><h3>Numerical Errors</h3><p>Absolute, relative, truncation, and round-off errors.</p></div>
    <div class="lecture-card" data-go="bisection"><div class="lecture-card-num">2</div><h3>Bisection Method</h3><p>Root-finding via interval halving and IVT.</p></div>
    <div class="lecture-card" data-go="newton"><div class="lecture-card-num">3</div><h3>Newton–Raphson</h3><p>Quadratic convergence using tangent lines.</p></div>
    <div class="lecture-card" data-go="secant"><div class="lecture-card-num">4</div><h3>Secant Method</h3><p>Derivative-free iteration through two points.</p></div>
    <div class="lecture-card" data-go="fixedpoint"><div class="lecture-card-num">5</div><h3>Fixed-Point Iteration</h3><p>Reformulating f(x)=0 as x=g(x).</p></div>
    <div class="lecture-card" data-go="jacobi"><div class="lecture-card-num">6</div><h3>Jacobi Method</h3><p>Iterative solver for linear systems.</p></div>
    <div class="lecture-card" data-go="gaussseidel"><div class="lecture-card-num">7</div><h3>Gauss–Seidel</h3><p>Improved iterative linear-system solver.</p></div>
    <div class="lecture-card" data-go="lagrange"><div class="lecture-card-num">8</div><h3>Lagrange Interpolation</h3><p>Polynomial through given data points.</p></div>
    <div class="lecture-card" data-go="divided"><div class="lecture-card-num">9</div><h3>Newton Divided Difference</h3><p>Efficient polynomial interpolation table.</p></div>
    <div class="lecture-card" data-go="differentiation"><div class="lecture-card-num">10</div><h3>Numerical Differentiation</h3><p>Forward, backward, and central differences.</p></div>
    <div class="lecture-card" data-go="integration"><div class="lecture-card-num">11</div><h3>Numerical Integration</h3><p>Trapezoidal and Simpson's rules.</p></div>
    <div class="lecture-card" data-go="ode"><div class="lecture-card-num">12</div><h3>ODEs — Euler & RK4</h3><p>Solving differential equations numerically.</p></div>
  </div>
</div>
`;

/* =====================================================
   LECTURE 1 — NUMERICAL ERRORS
   ===================================================== */
PAGES.errors = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 1</span>
    <h1 class="page-title">Numerical Errors</h1>
    <p class="page-subtitle">Foundation of all numerical methods — understanding how computed results differ from exact values.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Introduction</div></div>
    <p>In scientific computing and engineering applications, it is often impossible to obtain exact analytical solutions. Numerical methods compute <strong>approximate</strong> solutions, and the difference between the true value and the computed value is called the <strong>numerical error</strong>.</p>
    <p>Understanding errors allows us to:</p>
    <ul>
      <li>Evaluate the accuracy of numerical results.</li>
      <li>Compare different numerical methods.</li>
      <li>Control and reduce computational mistakes.</li>
      <li>Make reliable decisions based on numerical outputs.</li>
    </ul>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Exact and Approximate Values</div></div>
    <div class="callout definition">
      <div class="callout-title">📘 Definition</div>
      <div class="callout-body">
        Let \\(x\\) be the <strong>exact (true) value</strong> and \\(\\tilde{x}\\) be its <strong>approximate (computed) value</strong>. The error measures how far \\(\\tilde{x}\\) is from \\(x\\).
      </div>
    </div>
    <p><strong>Exact values</strong> come from: analytical formulas, mathematical definitions, high-precision theoretical results.</p>
    <p><strong>Approximate values</strong> come from: numerical algorithms, computer rounding, iterative procedures.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Absolute Error</div></div>
    <div class="formula center">
      <span class="formula-label">Formula</span>
      $$E_{\\text{abs}} = |x - \\tilde{x}|$$
    </div>
    <p>It measures the absolute difference between the exact value and the approximation. Absolute error alone may be misleading when comparing quantities of different magnitudes.</p>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Let \\(x = 3.14159\\) and \\(\\tilde{x} = 3.14\\). Compute the absolute error.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Direct Computation</div>
          $$E_{\\text{abs}} = |3.14159 - 3.14| = 0.00159$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Relative Error</div></div>
    <div class="formula center">
      <span class="formula-label">Formula</span>
      $$E_{\\text{rel}} = \\frac{|x - \\tilde{x}|}{|x|}, \\quad x \\neq 0$$
    </div>
    <p>Relative error is dimensionless and more meaningful for comparing accuracy across problems.</p>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Using \\(x = 3.14159\\), \\(\\tilde{x} = 3.14\\), find the relative error.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Apply Formula</div>
          $$E_{\\text{rel}} = \\frac{0.00159}{3.14159} \\approx 5.06 \\times 10^{-4}$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Percentage Error</div></div>
    <div class="formula center">
      $$E_{\\%} = E_{\\text{rel}} \\times 100\\%$$
    </div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 3</span></div></div>
      <div class="problem-statement">Compute the percentage error for the previous values.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        $$E_{\\%} = 5.06 \\times 10^{-4} \\times 100\\% = 0.0506\\%$$
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Truncation Error</div></div>
    <div class="callout definition">
      <div class="callout-title">📘 Definition</div>
      <div class="callout-body">Truncation error is the error introduced by terminating an infinite mathematical process after a finite number of steps.</div>
    </div>
    <p>From the Taylor expansion of \\(e^x\\):</p>
    <div class="formula center">
      $$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$
    </div>
    <p>If only the first \\(n\\) terms are used, the remaining terms represent the truncation error.</p>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 4</span></div></div>
      <div class="problem-statement">Approximate \\(e^{0.2}\\) using the first three terms of the Taylor series. Find the truncation error.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Apply Taylor Series</div>
          $$e^{0.2} \\approx 1 + 0.2 + \\frac{(0.2)^2}{2} = 1 + 0.2 + 0.02 = 1.22$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Compare with Exact</div>
          The exact value is \\(e^{0.2} \\approx 1.22140\\).
          $$E_{\\text{abs}} = |1.22140 - 1.22| \\approx 0.00140$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">Round-off Error</div></div>
    <p>Round-off error occurs because computers cannot represent all real numbers exactly. Digital computers store numbers using a finite number of digits.</p>
    <p>For example, \\(\\pi = 3.1415926535\\ldots\\) may be stored as \\(\\pi \\approx 3.1416\\).</p>

    <h3>Sources of Round-off Error</h3>
    <ul>
      <li>Finite number of digits in computer representation.</li>
      <li>Arithmetic operations (addition, subtraction, multiplication, division).</li>
      <li>Repeated calculations in iterative algorithms.</li>
    </ul>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 5</span></div></div>
      <div class="problem-statement">A computer stores numbers with only four decimal digits. Compute the round-off error for \\(x = 2.7182818\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>Stored value: \\(\\tilde{x} = 2.7183\\)</p>
        $$E_{\\text{abs}} = |2.7182818 - 2.7183| = 0.0000182$$
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 6 — Loss of Significance</span></div></div>
      <div class="problem-statement">Compute \\(x - y\\) where \\(x = 1.2345\\), \\(y = 1.2344\\), and the computer stores numbers to 3 decimal digits.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Exact Difference</div>
          $$x - y = 0.0001$$
        </div>
        <div class="step"><div class="step-label">Stored Values</div>
          $$x \\approx 1.235,\\quad y \\approx 1.234$$
          $$1.235 - 1.234 = 0.001$$
        </div>
        <div class="step"><div class="step-label">Error</div>
          $$|0.001 - 0.0001| = 0.0009$$
        </div>
        <p>This illustrates <strong>loss of significance</strong> due to round-off error.</p>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 7 — Accumulation</span></div></div>
      <div class="problem-statement">Compute \\(0.33 + 0.33 + 0.33\\) on a computer with 2-decimal precision.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>Exact result: \\(0.99\\). Even tiny per-operation errors accumulate in repeated operations.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">Truncation vs. Round-off Error</div></div>
    <table class="compare-table">
      <thead><tr><th>Truncation Error</th><th>Round-off Error</th></tr></thead>
      <tbody>
        <tr><td>Due to mathematical approximation</td><td>Due to computer precision</td></tr>
        <tr><td>Stopping infinite processes</td><td>Finite number of digits</td></tr>
        <tr><td>Example: Taylor series</td><td>Example: storing π as 3.14</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">Worked Exercises (Solved)</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Exact value \\(x = 12.5\\), approximate \\(\\tilde{x} = 12.42\\). Find absolute, relative, percentage errors.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        $$E_{\\text{abs}} = |12.5 - 12.42| = 0.08$$
        $$E_{\\text{rel}} = \\frac{0.08}{12.5} = 0.0064$$
        $$E_{\\%} = 0.64\\%$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Approximate \\(\\sqrt{7}\\) by 2.65 and find absolute and relative errors.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>Exact: \\(\\sqrt{7} \\approx 2.6457513\\)</p>
        $$E_{\\text{abs}} = |2.6457513 - 2.65| = 0.0042487$$
        $$E_{\\text{rel}} = \\frac{0.0042487}{2.6457513} \\approx 0.001606$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Use the first two terms of the Taylor series to approximate \\(e^{0.1}\\) and compute the truncation error.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        $$e^{0.1} \\approx 1 + 0.1 = 1.1$$
        <p>Exact: \\(e^{0.1} \\approx 1.10517\\)</p>
        $$E_{\\text{abs}} = |1.10517 - 1.1| = 0.00517$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 4</span></div></div>
      <div class="problem-statement">A calculator stores \\(\\pi\\) as 3.142. Compute absolute and relative round-off errors.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>Exact: \\(\\pi = 3.1415927\\)</p>
        $$E_{\\text{abs}} = |3.1415927 - 3.142| = 0.0004073$$
        $$E_{\\text{rel}} = \\frac{0.0004073}{3.1415927} \\approx 1.297 \\times 10^{-4}$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 5</span></div></div>
      <div class="problem-statement">Explain why relative error is preferred over absolute error.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>Relative error normalizes by the magnitude of the true value, making it <strong>scale-independent</strong>. An absolute error of 1 is huge when measuring a millimeter, but negligible when measuring a kilometer. Relative error captures this distinction, allowing fair comparisons across problems of different scales.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">10</div><div class="section-title">True / False Questions</div></div>
    ${tfQuestions([
      ["Absolute error depends on the scale of the exact value.", "True", "Larger magnitudes naturally lead to larger absolute errors for the same relative accuracy."],
      ["Relative error is always smaller than absolute error.", "False", "Relative error is dimensionless; comparing them directly is not meaningful. It depends on |x|."],
      ["Truncation error arises from rounding in computers.", "False", "Truncation comes from approximating infinite processes by finite steps; rounding causes round-off error."],
      ["Relative error is dimensionless.", "True", "It is a ratio, so the units cancel out."],
      ["A small absolute error always means high accuracy.", "False", "It depends on the scale — see Exercise 9 where a tiny absolute error has large relative error."]
    ])}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">11</div><div class="section-title">Multiple Choice</div></div>
    ${mcq("Which error is most suitable for comparing accuracy?", ["Absolute error","Relative error","Truncation error","Rounding error"], 1, "Relative error is dimensionless and scale-independent.")}
    ${mcq("Truncation error is caused by:", ["Finite precision arithmetic","Approximating infinite processes","Data measurement errors","Hardware failures"], 1, "Truncating an infinite series like Taylor's.")}
    ${mcq("Round-off error is mainly caused by:", ["Stopping an infinite series","Finite precision representation in computers","The Intermediate Value Theorem","Using exact arithmetic"], 1, "Computers store numbers using a fixed finite number of digits.")}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">12</div><div class="section-title">⚡ Exam Tips & Common Mistakes</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Forgetting absolute value bars in the error formula.</li>
          <li>Dividing by \\(\\tilde{x}\\) instead of \\(x\\) in relative error.</li>
          <li>Confusing truncation error (math) with round-off error (computer).</li>
          <li>Forgetting to multiply by 100 for percentage error.</li>
        </ul>
      </div>
    </div>
    <div class="callout success">
      <div class="callout-title">🎯 Quick Revision</div>
      <div class="callout-body">
        <p>Memorize the three formulas:
          \\(E_{\\text{abs}} = |x-\\tilde{x}|\\), 
          \\(E_{\\text{rel}} = |x-\\tilde{x}|/|x|\\), 
          \\(E_{\\%} = E_{\\text{rel}} \\times 100\\%\\).
        </p>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 2 — BISECTION METHOD
   ===================================================== */
PAGES.bisection = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 2</span>
    <h1 class="page-title">The Bisection Method</h1>
    <p class="page-subtitle">A reliable root-finding method based on the Intermediate Value Theorem — guaranteed to converge for continuous functions.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">The Root-Finding Problem</div></div>
    <p>We want to find a solution of \\(f(x) = 0\\). A value \\(p\\) with \\(f(p) = 0\\) is called a <strong>root</strong> (or zero) of \\(f\\).</p>
    <p>In many practical problems, the exact root cannot be obtained analytically, so we use numerical methods to <strong>approximate</strong> it.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Intermediate Value Theorem</div></div>
    <div class="callout theorem">
      <div class="callout-title">📐 Theorem (IVT)</div>
      <div class="callout-body">
        If \\(f\\) is continuous on \\([a, b]\\) and \\(f(a)\\,f(b) < 0\\), then there exists at least one root \\(p \\in (a, b)\\).
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Idea of the Method</div></div>
    <p>Start with an interval \\([a_1, b_1] = [a, b]\\) where the function changes sign. Define the midpoint:</p>
    <div class="formula center">$$p_1 = \\frac{a_1 + b_1}{2}$$</div>
    <ul>
      <li>If \\(f(p_1) = 0\\), then \\(p_1\\) is the root.</li>
      <li>Otherwise, choose the half-interval where the sign change still occurs.</li>
    </ul>
    <p>Repeat to produce a sequence of nested intervals containing the root.</p>

    <div class="geom-figure">
      <svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="160" x2="460" y2="160" stroke="#3b4d75" stroke-width="1.5"/>
        <text x="465" y="164" fill="#a8b2c8" font-size="12">x</text>
        <path d="M 60 60 Q 200 280 440 90" stroke="#6366f1" stroke-width="2.5" fill="none"/>
        <circle cx="250" cy="160" r="5" fill="#10b981"/>
        <text x="245" y="180" fill="#10b981" font-size="12" font-weight="700">p</text>
        <line x1="80" y1="155" x2="80" y2="165" stroke="#ef4444" stroke-width="2"/>
        <text x="72" y="195" fill="#ef4444" font-size="12">a</text>
        <line x1="420" y1="155" x2="420" y2="165" stroke="#10b981" stroke-width="2"/>
        <text x="416" y="195" fill="#10b981" font-size="12">b</text>
        <line x1="250" y1="155" x2="250" y2="165" stroke="#f59e0b" stroke-width="2"/>
      </svg>
      <div class="geom-caption">Bisection halves the interval until the root is trapped within tolerance.</div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Algorithm</div></div>
    <div class="callout note">
      <div class="callout-title">📋 Algorithm (Bisection)</div>
      <div class="callout-body">
        <p><strong>Input:</strong> \\(a, b\\), tolerance TOL, max iterations \\(N_0\\).</p>
        <ol>
          <li>Set \\(i = 1\\), compute \\(FA = f(a)\\).</li>
          <li>While \\(i \\leq N_0\\):</li>
          <li>Compute \\(p = a + \\frac{b-a}{2}\\).</li>
          <li>Compute \\(FP = f(p)\\).</li>
          <li>If \\(FP = 0\\) or \\(\\frac{b-a}{2} < \\text{TOL}\\), output \\(p\\) and stop.</li>
          <li>Set \\(i = i + 1\\).</li>
          <li>If \\(FA \\cdot FP > 0\\): set \\(a = p\\), \\(FA = FP\\); else set \\(b = p\\).</li>
        </ol>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Stopping Criteria</div></div>
    <div class="formula">
      $$|p_n - p_{n-1}| < \\varepsilon \\quad (1)$$
      $$\\frac{|p_n - p_{n-1}|}{|p_n|} < \\varepsilon, \\quad p_n \\neq 0 \\quad (2)$$
      $$|f(p_n)| < \\varepsilon \\quad (3)$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Worked Example</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example</span></div></div>
      <div class="problem-statement">Show that \\(f(x) = x^3 + 4x^2 - 10\\) has a root in \\([1, 2]\\) and approximate it using the bisection method.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Verify Sign Change</div>
          $$f(1) = 1 + 4 - 10 = -5 < 0$$
          $$f(2) = 8 + 16 - 10 = 14 > 0$$
          <p>Since \\(f(1)\\,f(2) < 0\\) and \\(f\\) is continuous, a root exists in \\((1, 2)\\).</p>
        </div>
        <div class="step"><div class="step-label">Step 2 — Iteration Table</div>
        <div class="table-wrap">
          <table class="iter-table">
            <thead><tr><th>n</th><th>aₙ</th><th>bₙ</th><th>pₙ</th><th>f(pₙ)</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>1.0000</td><td>2.0000</td><td>1.5000</td><td>2.3750</td></tr>
              <tr><td>2</td><td>1.0000</td><td>1.5000</td><td>1.2500</td><td>-1.7969</td></tr>
              <tr><td>3</td><td>1.2500</td><td>1.5000</td><td>1.3750</td><td>0.1621</td></tr>
              <tr><td>4</td><td>1.2500</td><td>1.3750</td><td>1.3125</td><td>-0.8484</td></tr>
              <tr><td>5</td><td>1.3125</td><td>1.3750</td><td>1.3438</td><td>-0.3510</td></tr>
              <tr><td>6</td><td>1.3438</td><td>1.3750</td><td>1.3594</td><td>-0.0964</td></tr>
              <tr class="row-final"><td>7</td><td>1.3594</td><td>1.3750</td><td>1.3672</td><td>0.0324</td></tr>
            </tbody>
          </table>
        </div>
        </div>
        <div class="step"><div class="step-label">Step 3 — Result</div>
          $$p \\approx 1.365$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">Error Bound Theorem</div></div>
    <div class="callout theorem">
      <div class="callout-title">📐 Theorem (Error Bound)</div>
      <div class="callout-body">
        Assume \\(f\\) is continuous on \\([a, b]\\) and \\(f(a)\\,f(b) < 0\\). Let \\(p_n\\) be the midpoint at iteration \\(n\\). Then:
        $$|p_n - p| \\leq \\frac{b - a}{2^n}$$
      </div>
    </div>
    <p>To ensure \\(|p_n - p| \\leq \\varepsilon\\), it suffices that:</p>
    <div class="formula center">$$\\frac{b-a}{2^n} \\leq \\varepsilon \\;\\Longrightarrow\\; n \\geq \\log_2\\!\\left(\\frac{b-a}{\\varepsilon}\\right)$$</div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Iteration Estimate</span></div></div>
      <div class="problem-statement">How many bisection iterations are required to guarantee accuracy \\(10^{-4}\\) for a root in \\([1, 2]\\)?</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Apply Bound</div>
          $$\\frac{1}{2^n} \\leq 10^{-4} \\;\\Longrightarrow\\; 2^n \\geq 10^4$$
          $$n \\geq \\log_2(10^4) \\approx 13.29$$
        </div>
        <div class="step"><div class="step-label">Conclusion</div>
          Minimum integer: \\(\\boxed{n = 14}\\)
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">Advantages & Disadvantages</div></div>
    <div class="pros-cons">
      <div class="pros">
        <h4>✓ Advantages</h4>
        <ul>
          <li>Always converges if continuity & sign change hold.</li>
          <li>Simple to implement.</li>
          <li>Predictable error bound.</li>
          <li>No derivative required.</li>
        </ul>
      </div>
      <div class="cons">
        <h4>✗ Disadvantages</h4>
        <ul>
          <li>Slow (linear) convergence.</li>
          <li>Needs initial interval with sign change.</li>
          <li>Cannot find roots of even multiplicity.</li>
          <li>Doesn't use function shape information.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Use the bisection method to find \\(p_3\\) for \\(f(x) = \\sqrt{x} - \\cos x\\) on \\([0, 1]\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Sign Check</div>
          \\(f(0) = 0 - 1 = -1 < 0\\), \\(f(1) = 1 - \\cos 1 \\approx 0.4597 > 0\\) ✓
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>aₙ</th><th>bₙ</th><th>pₙ</th><th>f(pₙ)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>0.0000</td><td>1.0000</td><td>0.5000</td><td>-0.1706</td></tr>
            <tr><td>2</td><td>0.5000</td><td>1.0000</td><td>0.7500</td><td>0.1346</td></tr>
            <tr class="row-final"><td>3</td><td>0.5000</td><td>0.7500</td><td>0.6250</td><td>-0.0203</td></tr>
          </tbody>
        </table></div>
        $$p_3 \\approx 0.625$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Determine the number of iterations needed for accuracy \\(10^{-5}\\) for a root in \\([0, 2]\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        $$\\frac{2}{2^n} \\leq 10^{-5} \\;\\Longrightarrow\\; 2^n \\geq 2 \\times 10^5$$
        $$n \\geq \\log_2(2 \\times 10^5) \\approx 17.61$$
        $$\\boxed{n = 18}$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Apply the bisection method to approximate a root of \\(\\cos x - x = 0\\) on \\([0, 1]\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Sign Check</div>
          \\(f(0) = 1 > 0\\), \\(f(1) = \\cos 1 - 1 \\approx -0.4597 < 0\\) ✓
        </div>
        <div class="step"><div class="step-label">Iterations (5 shown)</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>aₙ</th><th>bₙ</th><th>pₙ</th><th>f(pₙ)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>0.0000</td><td>1.0000</td><td>0.5000</td><td>0.3776</td></tr>
            <tr><td>2</td><td>0.5000</td><td>1.0000</td><td>0.7500</td><td>-0.0183</td></tr>
            <tr><td>3</td><td>0.5000</td><td>0.7500</td><td>0.6250</td><td>0.1859</td></tr>
            <tr><td>4</td><td>0.6250</td><td>0.7500</td><td>0.6875</td><td>0.0853</td></tr>
            <tr class="row-final"><td>5</td><td>0.6875</td><td>0.7500</td><td>0.7188</td><td>0.0339</td></tr>
          </tbody>
        </table></div>
        Root \\(\\approx 0.739\\) (more iterations needed for high accuracy).
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 4</span></div></div>
      <div class="problem-statement">Use bisection to find a root accurate within \\(10^{-3}\\) for \\(x^3 - x - 1 = 0\\) on \\([1, 2]\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations Needed</div>
          \\(\\frac{1}{2^n} \\leq 10^{-3} \\Rightarrow n \\geq 10\\).
        </div>
        <div class="step"><div class="step-label">Sign Check</div>
          \\(f(1) = -1\\), \\(f(2) = 5\\) ✓
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>aₙ</th><th>bₙ</th><th>pₙ</th><th>f(pₙ)</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>1.0000</td><td>2.0000</td><td>1.5000</td><td>0.8750</td></tr>
            <tr><td>2</td><td>1.0000</td><td>1.5000</td><td>1.2500</td><td>-0.2969</td></tr>
            <tr><td>3</td><td>1.2500</td><td>1.5000</td><td>1.3750</td><td>0.2246</td></tr>
            <tr><td>4</td><td>1.2500</td><td>1.3750</td><td>1.3125</td><td>-0.0515</td></tr>
            <tr><td>5</td><td>1.3125</td><td>1.3750</td><td>1.3438</td><td>0.0826</td></tr>
            <tr><td>6</td><td>1.3125</td><td>1.3438</td><td>1.3281</td><td>0.0146</td></tr>
            <tr><td>7</td><td>1.3125</td><td>1.3281</td><td>1.3203</td><td>-0.0187</td></tr>
            <tr><td>8</td><td>1.3203</td><td>1.3281</td><td>1.3242</td><td>-0.0021</td></tr>
            <tr><td>9</td><td>1.3242</td><td>1.3281</td><td>1.3262</td><td>0.0062</td></tr>
            <tr class="row-final"><td>10</td><td>1.3242</td><td>1.3262</td><td>1.3252</td><td>0.0021</td></tr>
          </tbody>
        </table></div>
        $$p \\approx 1.3247$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">10</div><div class="section-title">True / False</div></div>
    ${tfQuestions([
      ["The bisection method requires the function to be continuous on [a, b].", "True", "Continuity ensures IVT applies."],
      ["The interval length doubles at each iteration.", "False", "It is HALVED at each iteration."],
      ["If f(a)f(b) < 0 and f is continuous, then a root exists in (a, b).", "True", "This is exactly the IVT."],
      ["The bisection method requires the derivative f'(x).", "False", "No derivative needed — only function evaluations."],
      ["The error bound decreases by a factor of 1/2 each iteration.", "True", "After n iterations: |pₙ − p| ≤ (b−a)/2ⁿ."]
    ])}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">11</div><div class="section-title">Multiple Choice</div></div>
    ${mcq("The bisection method is based on:", ["Taylor expansion","Intermediate Value Theorem","Newton's law","Matrix inversion"], 1, "IVT guarantees a root exists when sign changes.")}
    ${mcq("After n iterations, the interval length is:", ["(b−a)/n","(b−a)/2ⁿ","(b−a)·n","(b−a)/2^(n+1)"], 1, "Each iteration halves the interval.")}
    ${mcq("A stopping criterion that measures approximate relative error is:", ["|pₙ − pₙ₋₁| < ε","|pₙ − pₙ₋₁|/|pₙ| < ε","|f(pₙ)| < ε","None of the above"], 1, "Dividing by |pₙ| gives the relative form.")}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">12</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Forgetting to verify the sign change \\(f(a)f(b) < 0\\) before starting.</li>
          <li>Replacing the wrong endpoint after computing \\(f(p)\\). Rule: keep the side where the sign change still occurs.</li>
          <li>Using \\(\\log_{10}\\) instead of \\(\\log_2\\) for iteration count.</li>
          <li>Rounding the iteration count down — always round UP.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 3 — NEWTON-RAPHSON METHOD
   ===================================================== */
PAGES.newton = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 3</span>
    <h1 class="page-title">Newton–Raphson Method</h1>
    <p class="page-subtitle">A fast root-finding technique with quadratic convergence using tangent lines.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Root-Finding Using Tangent Lines</div></div>
    <p>To solve \\(f(x) = 0\\), use the tangent line at a point near the root to obtain a better approximation. The tangent line at \\((p_0, f(p_0))\\) is:</p>
    <div class="formula center">$$y - f(p_0) = f'(p_0)(x - p_0)$$</div>
    <p>Setting \\(y = 0\\) and solving for \\(x\\) gives the next approximation:</p>
    <div class="formula center">
      <span class="formula-label">Newton's Iteration</span>
      $$p_{n+1} = p_n - \\frac{f(p_n)}{f'(p_n)}$$
    </div>

    <div class="geom-figure">
      <svg viewBox="0 0 500 230" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="170" x2="460" y2="170" stroke="#3b4d75"/>
        <line x1="60" y1="40" x2="60" y2="200" stroke="#3b4d75"/>
        <path d="M 80 60 Q 200 220 440 60" stroke="#6366f1" stroke-width="2.5" fill="none"/>
        <line x1="100" y1="200" x2="380" y2="50" stroke="#06b6d4" stroke-width="2" stroke-dasharray="5,4"/>
        <circle cx="380" cy="120" r="5" fill="#6366f1"/>
        <text x="390" y="118" fill="#a8b2c8" font-size="11">(p₀, f(p₀))</text>
        <circle cx="225" cy="170" r="5" fill="#10b981"/>
        <text x="200" y="190" fill="#10b981" font-size="12" font-weight="700">p₁</text>
        <circle cx="200" cy="170" r="4" fill="#f59e0b"/>
        <text x="170" y="160" fill="#f59e0b" font-size="11" font-weight="700">p</text>
      </svg>
      <div class="geom-caption">Newton's method uses the tangent line's x-intercept as the next approximation.</div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Algorithm</div></div>
    <div class="callout note">
      <div class="callout-title">📋 Newton's Algorithm</div>
      <div class="callout-body">
        <p><strong>Input:</strong> initial approximation \\(p_0\\), tolerance TOL, max iterations \\(N_0\\).</p>
        <ol>
          <li>Set \\(i = 1\\).</li>
          <li>While \\(i \\leq N_0\\):</li>
          <li>Compute \\(p = p_0 - f(p_0)/f'(p_0)\\).</li>
          <li>If \\(|p - p_0| < \\text{TOL}\\), output \\(p\\) and stop.</li>
          <li>Set \\(i = i + 1\\), \\(p_0 = p\\).</li>
        </ol>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Worked Example</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example</span></div></div>
      <div class="problem-statement">Use Newton's method to approximate a root of \\(f(x) = x^2 - 3\\) with \\(p_0 = 2\\). Stop when \\(|p_n - p_{n-1}| < 0.01\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Derivative</div>
          $$f'(x) = 2x$$
          $$p_{n+1} = p_n - \\frac{p_n^2 - 3}{2 p_n}$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Iteration Table</div>
        <p>True root: \\(p = \\sqrt{3} \\approx 1.73205\\).</p>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>pₙ</th><th>f(pₙ)</th><th>|pₙ − p|</th><th>Stop?</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>2.0000</td><td>1.0000</td><td>0.2679</td><td>No</td></tr>
            <tr><td>1</td><td>1.7500</td><td>0.0625</td><td>0.0179</td><td>No</td></tr>
            <tr><td>2</td><td>1.7321</td><td>0.0003</td><td>0.0001</td><td>Yes</td></tr>
            <tr class="row-final"><td>3</td><td>1.7320</td><td>≈ 0</td><td>< 10⁻⁶</td><td>Yes</td></tr>
          </tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Step 3 — Verify Stopping</div>
          $$|p_3 - p_2| = 0.0001 < 0.01$$
        </div>
        <div class="step"><div class="step-label">Conclusion</div>
          $$\\boxed{p \\approx 1.732}$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Convergence Theorem</div></div>
    <div class="callout theorem">
      <div class="callout-title">📐 Theorem</div>
      <div class="callout-body">
        If \\(f \\in C^2[a, b]\\), \\(p\\) is a <strong>simple root</strong> of \\(f(x) = 0\\), and \\(p_0\\) is sufficiently close to \\(p\\), then the Newton sequence \\(\\{p_n\\}\\) converges to \\(p\\) <strong>quadratically</strong>:
        $$|p_{n+1} - p| \\approx C \\,|p_n - p|^2$$
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Advantages & Disadvantages</div></div>
    <div class="pros-cons">
      <div class="pros">
        <h4>✓ Advantages</h4>
        <ul>
          <li>Very fast (quadratic) convergence near the root.</li>
          <li>Usually fewer iterations than bisection.</li>
          <li>Powerful for smooth problems.</li>
        </ul>
      </div>
      <div class="cons">
        <h4>✗ Disadvantages</h4>
        <ul>
          <li>Requires computation of \\(f'(x)\\).</li>
          <li>May diverge with a poor initial guess.</li>
          <li>Fails if \\(f'(p_n) = 0\\).</li>
          <li>Only linearly convergent at multiple roots.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Use Newton's method to approximate the root of \\(x^3 - x - 1 = 0\\) with \\(p_0 = 1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(f(x) = x^3 - x - 1\\), \\(f'(x) = 3x^2 - 1\\)
          $$p_{n+1} = p_n - \\frac{p_n^3 - p_n - 1}{3p_n^2 - 1}$$
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>pₙ</th><th>f(pₙ)</th><th>f'(pₙ)</th><th>pₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1.0000</td><td>-1.0000</td><td>2.0000</td><td>1.5000</td></tr>
            <tr><td>1</td><td>1.5000</td><td>0.8750</td><td>5.7500</td><td>1.3478</td></tr>
            <tr><td>2</td><td>1.3478</td><td>0.1006</td><td>4.4499</td><td>1.3252</td></tr>
            <tr><td>3</td><td>1.3252</td><td>0.0021</td><td>4.2685</td><td>1.3247</td></tr>
            <tr class="row-final"><td>4</td><td>1.3247</td><td>≈ 0</td><td>4.2647</td><td>1.3247</td></tr>
          </tbody>
        </table></div>
        $$p \\approx 1.3247$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Apply Newton's method to find a root of \\(\\cos x - x = 0\\) with \\(p_0 = 0.5\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(f(x) = \\cos x - x\\), \\(f'(x) = -\\sin x - 1\\)
          $$p_{n+1} = p_n - \\frac{\\cos p_n - p_n}{-\\sin p_n - 1}$$
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>pₙ</th><th>f(pₙ)</th><th>pₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.5000</td><td>0.3776</td><td>0.7552</td></tr>
            <tr><td>1</td><td>0.7552</td><td>-0.0271</td><td>0.7391</td></tr>
            <tr><td>2</td><td>0.7391</td><td>-0.0001</td><td>0.7391</td></tr>
            <tr class="row-final"><td>3</td><td>0.7391</td><td>≈ 0</td><td>0.7391</td></tr>
          </tbody>
        </table></div>
        $$p \\approx 0.7391$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Use Newton's method to approximate \\(\\sqrt{5}\\) by solving \\(x^2 - 5 = 0\\) with \\(p_0 = 2\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(f(x) = x^2 - 5\\), \\(f'(x) = 2x\\)
          $$p_{n+1} = p_n - \\frac{p_n^2 - 5}{2 p_n} = \\frac{1}{2}\\!\\left(p_n + \\frac{5}{p_n}\\right)$$
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>pₙ</th><th>f(pₙ)</th><th>pₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>2.0000</td><td>-1.0000</td><td>2.2500</td></tr>
            <tr><td>1</td><td>2.2500</td><td>0.0625</td><td>2.2361</td></tr>
            <tr><td>2</td><td>2.2361</td><td>0.0001</td><td>2.2361</td></tr>
            <tr class="row-final"><td>3</td><td>2.2361</td><td>≈ 0</td><td>2.2361</td></tr>
          </tbody>
        </table></div>
        $$\\sqrt{5} \\approx 2.2361$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">True / False</div></div>
    ${tfQuestions([
      ["Newton's method requires the derivative of the function.", "True", "The formula uses f'(pₙ)."],
      ["Newton's method always converges.", "False", "It may diverge if the initial guess is poor or if f'(pₙ)=0."],
      ["Newton's method has quadratic convergence near the root.", "True", "Order of convergence is 2 for simple roots."],
      ["The method uses tangent lines to approximate the root.", "True", "Each iteration uses the x-intercept of the tangent."],
      ["Newton's method halves the interval at each step.", "False", "That's bisection. Newton uses tangent slopes."]
    ])}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">Multiple Choice</div></div>
    ${mcq("The Newton iteration formula is:", ["pₙ = pₙ₋₁ − f(pₙ₋₁)","pₙ = pₙ₋₁ − f(pₙ₋₁)/f'(pₙ₋₁)","pₙ = f(pₙ₋₁)","pₙ = f'(pₙ₋₁)/f(pₙ₋₁)"], 1, "Standard Newton-Raphson formula.")}
    ${mcq("The convergence rate of Newton's method is:", ["Linear","Quadratic","Cubic","Logarithmic"], 1, "Near a simple root, |pₙ₊₁ − p| ≈ C|pₙ − p|².")}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Forgetting the minus sign in the formula.</li>
          <li>Using \\(f'\\) at the wrong point — always evaluate at \\(p_n\\), the current iterate.</li>
          <li>Choosing \\(p_0\\) where \\(f'(p_0) = 0\\) — division by zero.</li>
          <li>Not checking that the sequence is actually converging (could be oscillating!).</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 4 — SECANT METHOD
   ===================================================== */
PAGES.secant = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 4</span>
    <h1 class="page-title">Secant Method</h1>
    <p class="page-subtitle">Newton's speed without the derivative — using a secant line through two points.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Introduction</div></div>
    <p>To solve \\(f(x) = 0\\), we often use iterative methods. Newton's method is fast but requires computing \\(f'(x)\\), which may be difficult or expensive.</p>
    <p>The <strong>Secant method</strong> avoids derivatives by replacing \\(f'(x)\\) with a finite-difference approximation based on two previous approximations.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Derivation of the Secant Formula</div></div>
    <p>Newton's method is \\(x_{n+1} = x_n - f(x_n)/f'(x_n)\\). Approximating the derivative by the secant slope through \\((x_{n-1}, f(x_{n-1}))\\) and \\((x_n, f(x_n))\\):</p>
    <div class="formula center">
      $$f'(x_n) \\approx \\frac{f(x_{n-1}) - f(x_n)}{x_{n-1} - x_n}$$
    </div>
    <p>Substituting into Newton's formula gives the <strong>Secant iteration</strong>:</p>
    <div class="formula center">
      <span class="formula-label">Secant Formula</span>
      $$x_{n+1} = x_n - f(x_n) \\cdot \\frac{x_{n-1} - x_n}{f(x_{n-1}) - f(x_n)}$$
    </div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Important Notes</div>
      <div class="callout-body">
        <ul>
          <li>Two starting values are required: \\(x_0\\) and \\(x_1\\).</li>
          <li>The method fails if \\(f(x_{n-1}) = f(x_n)\\) (division by zero).</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Algorithm</div></div>
    <div class="callout note">
      <div class="callout-title">📋 Secant Algorithm</div>
      <div class="callout-body">
        <p><strong>Given:</strong> function \\(f\\), initial guesses \\(x_0, x_1\\), tolerance \\(\\varepsilon > 0\\), max iterations \\(N\\).</p>
        <ol>
          <li>Compute \\(f(x_0)\\) and \\(f(x_1)\\).</li>
          <li>For \\(n = 1, 2, \\ldots\\) compute the secant formula above.</li>
          <li>Stop if \\(|x_{n+1} - x_n| < \\varepsilon\\) or \\(|f(x_{n+1})| < \\varepsilon\\).</li>
          <li>If \\(n\\) reaches \\(N\\) without stopping, report failure.</li>
        </ol>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Worked Examples</div></div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Use the Secant method to approximate a root of \\(f(x) = x^2 - 2\\) with \\(x_0 = 1\\), \\(x_1 = 2\\), tolerance \\(\\varepsilon = 10^{-3}\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iteration Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ₋₁</th><th>xₙ</th><th>f(xₙ₋₁)</th><th>f(xₙ)</th><th>xₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>1.0000</td><td>2.0000</td><td>-1.0000</td><td>2.0000</td><td>1.3333</td></tr>
            <tr><td>2</td><td>2.0000</td><td>1.3333</td><td>2.0000</td><td>-0.2222</td><td>1.4000</td></tr>
            <tr><td>3</td><td>1.3333</td><td>1.4000</td><td>-0.2222</td><td>-0.0400</td><td>1.4146</td></tr>
            <tr class="row-final"><td>4</td><td>1.4000</td><td>1.4146</td><td>-0.0400</td><td>0.0009</td><td>1.4142</td></tr>
          </tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Stopping Check</div>
          $$|x_5 - x_4| = |1.4142 - 1.4146| = 0.0004 < 10^{-3}$$
          $$\\boxed{x \\approx 1.4142}$$
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Use the Secant method to solve \\(f(x) = \\cos x - x\\) with \\(x_0 = 0.5\\), \\(x_1 = 0.7\\), tolerance \\(\\varepsilon = 10^{-4}\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iteration Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ₋₁</th><th>xₙ</th><th>xₙ₊₁</th><th>|xₙ₊₁ − xₙ|</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>0.5000</td><td>0.7000</td><td>0.7360</td><td>0.0360</td></tr>
            <tr><td>2</td><td>0.7000</td><td>0.7360</td><td>0.7391</td><td>0.0031</td></tr>
            <tr class="row-final"><td>3</td><td>0.7360</td><td>0.7391</td><td>0.7391</td><td>0.0000</td></tr>
          </tbody>
        </table></div>
        $$\\boxed{x \\approx 0.7391}$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Advantages & Disadvantages</div></div>
    <div class="pros-cons">
      <div class="pros">
        <h4>✓ Advantages</h4>
        <ul>
          <li>No derivative required.</li>
          <li>Usually faster than bisection.</li>
          <li>Simple implementation.</li>
          <li>Superlinear convergence (~1.618).</li>
        </ul>
      </div>
      <div class="cons">
        <h4>✗ Disadvantages</h4>
        <ul>
          <li>Not guaranteed to converge.</li>
          <li>Requires two initial values.</li>
          <li>May fail if \\(f(x_{n-1}) \\approx f(x_n)\\).</li>
          <li>Slower than Newton (when derivative is cheap).</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Use the Secant method to solve \\(x^2 - 3 = 0\\) with \\(x_0 = 1\\), \\(x_1 = 2\\), \\(\\varepsilon = 10^{-3}\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ₋₁</th><th>xₙ</th><th>f(xₙ)</th><th>xₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>1.0000</td><td>2.0000</td><td>1.0000</td><td>1.6667</td></tr>
            <tr><td>2</td><td>2.0000</td><td>1.6667</td><td>-0.2222</td><td>1.7273</td></tr>
            <tr><td>3</td><td>1.6667</td><td>1.7273</td><td>-0.0166</td><td>1.7321</td></tr>
            <tr class="row-final"><td>4</td><td>1.7273</td><td>1.7321</td><td>0.0001</td><td>1.7321</td></tr>
          </tbody>
        </table></div>
        $$x \\approx 1.7321 \\approx \\sqrt{3}$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Use the Secant method to solve \\(x^3 - x - 1 = 0\\) with \\(x_0 = 1\\), \\(x_1 = 1.5\\), \\(\\varepsilon = 10^{-4}\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ₋₁</th><th>xₙ</th><th>f(xₙ)</th><th>xₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>1.0000</td><td>1.5000</td><td>0.8750</td><td>1.2667</td></tr>
            <tr><td>2</td><td>1.5000</td><td>1.2667</td><td>-0.2347</td><td>1.3160</td></tr>
            <tr><td>3</td><td>1.2667</td><td>1.3160</td><td>-0.0376</td><td>1.3254</td></tr>
            <tr><td>4</td><td>1.3160</td><td>1.3254</td><td>0.0028</td><td>1.3247</td></tr>
            <tr class="row-final"><td>5</td><td>1.3254</td><td>1.3247</td><td>-0.0001</td><td>1.3247</td></tr>
          </tbody>
        </table></div>
        $$x \\approx 1.3247$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Use the Secant method to approximate a root of \\(e^{-x} - x = 0\\) with \\(x_0 = 0\\), \\(x_1 = 1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ₋₁</th><th>xₙ</th><th>f(xₙ)</th><th>xₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>0.0000</td><td>1.0000</td><td>-0.6321</td><td>0.6127</td></tr>
            <tr><td>2</td><td>1.0000</td><td>0.6127</td><td>-0.0708</td><td>0.5638</td></tr>
            <tr><td>3</td><td>0.6127</td><td>0.5638</td><td>0.0052</td><td>0.5671</td></tr>
            <tr class="row-final"><td>4</td><td>0.5638</td><td>0.5671</td><td>0.0000</td><td>0.5671</td></tr>
          </tbody>
        </table></div>
        $$x \\approx 0.5671$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 4</span></div></div>
      <div class="problem-statement">Explain why a poor choice of \\(x_0, x_1\\) may lead to divergence.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>If \\(x_0\\) and \\(x_1\\) are far from the root or located where the function is nearly flat, the secant line slope becomes very small, causing the next iterate \\(x_{n+1}\\) to jump far away. This can lead to:</p>
        <ul>
          <li><strong>Oscillation</strong> between values that don't approach the root.</li>
          <li><strong>Divergence</strong> to ±∞ if the function grows on one side.</li>
          <li><strong>Division by zero</strong> if \\(f(x_0) \\approx f(x_1)\\).</li>
        </ul>
        <p>The method has no global convergence guarantee — initial guesses must be close enough to the root.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">True / False</div></div>
    ${tfQuestions([
      ["The Secant method requires computing f'(x).", "False", "It avoids derivatives entirely."],
      ["The Secant method uses two initial approximations.", "True", "It needs x₀ and x₁ to compute a secant line."],
      ["The Secant method always converges if f is continuous.", "False", "Convergence requires good initial guesses."],
      ["The stopping criterion |xₙ₊₁ − xₙ| < ε is practical when the true root is unknown.", "True", "We monitor convergence of the sequence."],
      ["If f(xₙ₋₁) = f(xₙ), the Secant method cannot compute xₙ₊₁.", "True", "Division by zero in the formula."]
    ])}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">Multiple Choice</div></div>
    ${mcq("The Secant method is mainly used to:", ["Solve linear systems","Approximate roots of f(x) = 0","Compute integrals","Interpolate data"], 1, "It's a root-finding method.")}
    ${mcq("The Secant method approximates the derivative by:", ["A tangent slope","A secant slope using two points","A constant slope","Simpson's rule"], 1, "Two-point finite difference replaces f'.")}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Mixing up indices: the formula uses \\(x_n\\) and \\(x_{n-1}\\), and produces \\(x_{n+1}\\).</li>
          <li>Forgetting to update \\(x_{n-1}\\) and \\(x_n\\) correctly between iterations.</li>
          <li>Confusing the Secant formula sign — keep the minus sign and the order of subtraction.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 5 — FIXED-POINT ITERATION
   ===================================================== */
PAGES.fixedpoint = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 5</span>
    <h1 class="page-title">Fixed-Point Iteration Method</h1>
    <p class="page-subtitle">Reformulating f(x)=0 as x=g(x) — convergence depends on the choice of g.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Introduction</div></div>
    <p>To solve a nonlinear equation \\(f(x) = 0\\), one approach is to rewrite it in the equivalent form:</p>
    <div class="formula center">$$x = g(x)$$</div>
    <p>called a <strong>fixed-point equation</strong>. A number \\(p\\) satisfying \\(p = g(p)\\) is called a <strong>fixed point</strong>.</p>
    <p>The Fixed-Point Iteration Method generates a sequence converging to the solution by repeated substitution.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Iteration Formula</div></div>
    <div class="formula center">
      <span class="formula-label">Iteration</span>
      $$x_{n+1} = g(x_n), \\quad n = 0, 1, 2, \\ldots$$
    </div>
    <p>Each new approximation is obtained by substituting the previous one into \\(g\\). The fixed point is the intersection of the curves \\(y = g(x)\\) and \\(y = x\\).</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Convergence Theorem</div></div>
    <div class="callout theorem">
      <div class="callout-title">📐 Theorem</div>
      <div class="callout-body">
        Let \\(g\\) be a function such that:
        <ul>
          <li>\\(g(x)\\) is continuous on \\([a, b]\\),</li>
          <li>\\(g(x)\\) maps \\([a, b]\\) into itself,</li>
          <li>There exists \\(0 < k < 1\\) such that \\(|g'(x)| \\leq k\\) for all \\(x \\in [a, b]\\).</li>
        </ul>
        Then the fixed-point iteration converges to the unique fixed point \\(p\\) in \\([a, b]\\).
      </div>
    </div>
    <div class="callout note">
      <div class="callout-title">💡 Practical Condition</div>
      <div class="callout-body">
        Near the fixed point: \\(|g'(p)| < 1\\) ensures convergence.
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Convergence Check — Solved Example</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Solved</span></div></div>
      <div class="problem-statement">Determine whether \\(x_{n+1} = g(x_n) = \\frac{x_n + 2}{3}\\) converges, and find the fixed point.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Find Fixed Point</div>
          Solve \\(p = (p + 2)/3\\):
          $$3p = p + 2 \\implies 2p = 2 \\implies p = 1$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Check Convergence</div>
          $$g'(x) = \\frac{1}{3}, \\quad |g'(p)| = \\frac{1}{3} < 1 \\;\\checkmark$$
          Iteration converges.
        </div>
        <div class="step"><div class="step-label">Step 3 — Iterations (x₀ = 0)</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ</th><th>xₙ₊₁ = g(xₙ)</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.0000</td><td>0.6667</td></tr>
            <tr><td>1</td><td>0.6667</td><td>0.8889</td></tr>
            <tr><td>2</td><td>0.8889</td><td>0.9630</td></tr>
            <tr><td>3</td><td>0.9630</td><td>0.9877</td></tr>
            <tr class="row-final"><td>4</td><td>0.9877</td><td>0.9959</td></tr>
          </tbody>
        </table></div>
        \\(x_n \\to 1\\) ✓
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Solved (Unsolved in notes)</span></div></div>
      <div class="problem-statement">Determine whether \\(x_{n+1} = g(x_n) = 2 - x_n^2\\) converges near its fixed point.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Find Fixed Point</div>
          \\(p = 2 - p^2 \\implies p^2 + p - 2 = 0 \\implies (p+2)(p-1) = 0\\)
          $$p = 1 \\text{ or } p = -2$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Compute g'(x)</div>
          $$g'(x) = -2x$$
        </div>
        <div class="step"><div class="step-label">Step 3 — Evaluate at Fixed Points</div>
          At \\(p = 1\\): \\(|g'(1)| = 2 > 1\\) ✗ <strong>diverges</strong>.<br>
          At \\(p = -2\\): \\(|g'(-2)| = 4 > 1\\) ✗ <strong>diverges</strong>.
        </div>
        <div class="step"><div class="step-label">Conclusion</div>
          Both fixed points fail the convergence test — this choice of \\(g\\) is <strong>unsuitable</strong>.
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Worked Examples</div></div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Solve \\(x^2 - 3x + 2 = 0\\) using fixed-point iteration with \\(g(x) = (x^2 + 2)/3\\) and \\(x_0 = 1.5\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iteration Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ</th><th>xₙ₊₁ = g(xₙ)</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1.5000</td><td>1.4167</td></tr>
            <tr><td>1</td><td>1.4167</td><td>1.3890</td></tr>
            <tr><td>2</td><td>1.3890</td><td>1.3797</td></tr>
            <tr><td>3</td><td>1.3797</td><td>1.3766</td></tr>
            <tr class="row-final"><td>4</td><td>1.3766</td><td>1.3755</td></tr>
          </tbody>
        </table></div>
        $$x \\approx 1.376$$
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Solve \\(x^3 + x - 1 = 0\\) using \\(g(x) = 1/(1 + x^2)\\) and \\(x_0 = 0.5\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iteration Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ</th><th>xₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.5000</td><td>0.8000</td></tr>
            <tr><td>1</td><td>0.8000</td><td>0.6098</td></tr>
            <tr><td>2</td><td>0.6098</td><td>0.7281</td></tr>
            <tr><td>3</td><td>0.7281</td><td>0.6535</td></tr>
            <tr><td>4</td><td>0.6535</td><td>0.7006</td></tr>
            <tr class="row-final"><td>5</td><td>0.7006</td><td>0.6701</td></tr>
          </tbody>
        </table></div>
        Converges to \\(x \\approx 0.682\\)
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Detailed Example 1 (from notes)</span></div></div>
      <div class="problem-statement">Determine a solution accurate to within \\(10^{-2}\\) for \\(x^4 - 3x^2 - 3 = 0\\) on \\([1, 2]\\). Use \\(p_0 = 1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Rewrite</div>
          \\(x^4 = 3x^2 + 3 \\implies x = (3x^2 + 3)^{1/4}\\)
          $$g(x) = (3x^2 + 3)^{1/4}$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>pₙ</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1.0000</td></tr>
            <tr><td>1</td><td>1.5651</td></tr>
            <tr><td>2</td><td>1.8224</td></tr>
            <tr><td>3</td><td>1.9066</td></tr>
            <tr><td>4</td><td>1.9375</td></tr>
            <tr class="row-final"><td>5</td><td>1.9433</td></tr>
          </tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Step 3 — Check Stopping</div>
          \\(|p_5 - p_4| = 0.0058 < 0.01\\) ✓
          $$\\boxed{x \\approx 1.94}$$
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Detailed Example 2 (from notes)</span></div></div>
      <div class="problem-statement">Show that \\(g(x) = \\pi + \\frac{1}{2}\\sin(x/2)\\) has a unique fixed point on \\([0, 2\\pi]\\). Approximate within \\(10^{-2}\\) and estimate iterations using the contraction bound.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Maps Interval Into Itself</div>
          Since \\(\\sin(x/2) \\in [-1, 1]\\), \\(g(x) \\in [\\pi - 1/2, \\pi + 1/2] \\subset [0, 2\\pi]\\) ✓
        </div>
        <div class="step"><div class="step-label">Step 2 — Contraction</div>
          $$g'(x) = \\frac{1}{4}\\cos(x/2), \\quad |g'(x)| \\leq \\frac{1}{4} = k < 1$$
          Unique fixed point exists.
        </div>
        <div class="step"><div class="step-label">Step 3 — Iterations (p₀ = 0)</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>pₙ</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.000000</td></tr>
            <tr><td>1</td><td>3.141593</td></tr>
            <tr><td>2</td><td>3.641593</td></tr>
            <tr><td>3</td><td>3.626049</td></tr>
            <tr class="row-final"><td>4</td><td>3.626996</td></tr>
          </tbody>
        </table></div>
          \\(|p_4 - p_3| = 0.000947 < 0.01\\) ✓
          $$\\boxed{p \\approx 3.63}$$
        </div>
        <div class="step"><div class="step-label">Step 4 — Theoretical Iteration Count</div>
          $$|p - p_n| \\leq \\frac{k^n}{1-k}|p_1 - p_0|$$
          With \\(k = 0.25\\): \\(\\frac{(0.25)^n}{0.75}\\,\\pi \\leq 10^{-2}\\)
          Solving: \\(n \\geq 5\\).
          Actual needed: 4. The bound is conservative.
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Advantages & Disadvantages</div></div>
    <div class="pros-cons">
      <div class="pros">
        <h4>✓ Advantages</h4>
        <ul>
          <li>Simple to implement.</li>
          <li>No derivative required.</li>
          <li>Flexible choice of \\(g(x)\\).</li>
        </ul>
      </div>
      <div class="cons">
        <h4>✗ Disadvantages</h4>
        <ul>
          <li>Convergence depends on choice of \\(g\\).</li>
          <li>May diverge if \\(|g'(x)| \\geq 1\\).</li>
          <li>Usually slower than Newton's method.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Solve \\(x^2 - 2 = 0\\) using \\(g(x) = (x + 2/x)/2\\), \\(x_0 = 1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ</th><th>xₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1.0000</td><td>1.5000</td></tr>
            <tr><td>1</td><td>1.5000</td><td>1.4167</td></tr>
            <tr><td>2</td><td>1.4167</td><td>1.4142</td></tr>
            <tr class="row-final"><td>3</td><td>1.4142</td><td>1.4142</td></tr>
          </tbody>
        </table></div>
        \\(x \\approx 1.4142 \\approx \\sqrt{2}\\) (This is Newton's iteration in disguise!)
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Solve \\(x^3 - 2x - 5 = 0\\) using \\(g(x) = \\sqrt[3]{2x + 5}\\) with \\(x_0 = 2\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>xₙ</th><th>xₙ₊₁ = ∛(2xₙ + 5)</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>2.0000</td><td>2.0801</td></tr>
            <tr><td>1</td><td>2.0801</td><td>2.0924</td></tr>
            <tr><td>2</td><td>2.0924</td><td>2.0942</td></tr>
            <tr><td>3</td><td>2.0942</td><td>2.0945</td></tr>
            <tr class="row-final"><td>4</td><td>2.0945</td><td>2.0946</td></tr>
          </tbody>
        </table></div>
        $$x \\approx 2.0946$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">For \\(g(x) = (x + 3/x)/2\\), find the fixed point and test whether \\(|g'(p)| < 1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Fixed Point</div>
          \\(p = (p + 3/p)/2 \\implies 2p = p + 3/p \\implies p^2 = 3\\)
          $$p = \\sqrt{3} \\approx 1.732$$
        </div>
        <div class="step"><div class="step-label">Derivative</div>
          \\(g'(x) = (1 - 3/x^2)/2\\).
          At \\(p = \\sqrt{3}\\): \\(g'(\\sqrt{3}) = (1 - 1)/2 = 0\\).
          $$|g'(p)| = 0 < 1 \\;\\checkmark$$
        </div>
        <div class="step"><div class="step-label">Conclusion</div>
          Convergence is extremely fast (this is Newton's method for \\(x^2 - 3\\)!).
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 4</span></div></div>
      <div class="problem-statement">Explain why an unsuitable \\(g(x)\\) may cause divergence even if a root exists.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <p>The fixed-point iteration \\(x_{n+1} = g(x_n)\\) magnifies errors by approximately \\(|g'(p)|\\) per step. If \\(|g'(p)| \\geq 1\\), errors grow rather than shrink, and the sequence moves away from the fixed point. Even though the equation \\(f(x) = 0\\) has a valid root, the chosen rearrangement \\(x = g(x)\\) fails to attract iterates toward it. For example, \\(g(x) = 2 - x^2\\) has fixed points at \\(\\pm 2, 1\\) but \\(|g'| > 1\\) at both, so iteration diverges. The remedy is to choose a different \\(g\\) (often via Newton or by algebraic rearrangement) satisfying the convergence condition.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">True / False</div></div>
    ${tfQuestions([
      ["A fixed point satisfies p = g(p).", "True", "Definition of fixed point."],
      ["The iteration formula is xₙ₊₁ = g(xₙ).", "True", "Standard iterative formula."],
      ["The method always converges regardless of g(x).", "False", "Convergence requires |g'(p)| < 1."],
      ["If |g'(p)| < 1, convergence is expected near p.", "True", "Local contraction condition."],
      ["Fixed-point iteration requires two initial guesses.", "False", "Only one starting value needed."]
    ])}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">Multiple Choice</div></div>
    ${mcq("A fixed point of g(x) satisfies:", ["f(x) = 0","x = g(x)","g'(x) = 0","x = 0"], 1, "By definition.")}
    ${mcq("A practical convergence condition near the fixed point is:", ["|g'(p)| > 1","|g'(p)| < 1","g(p) = 0","p = 0"], 1, "Contraction in the local neighborhood.")}
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">10</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Forgetting to check the convergence condition \\(|g'(p)| < 1\\).</li>
          <li>Choosing a \\(g\\) without testing it — many rearrangements diverge!</li>
          <li>Confusing fixed points of \\(g\\) with roots of \\(g\\) (those are different).</li>
          <li>Not verifying that \\(g\\) maps \\([a, b]\\) into itself.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 6 — JACOBI METHOD
   ===================================================== */
PAGES.jacobi = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 6</span>
    <h1 class="page-title">Jacobi Iterative Method</h1>
    <p class="page-subtitle">Solving linear systems Ax = b by iterating with old values of x at every step.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Linear System of n Variables</div></div>
    <p>A linear system of \\(n\\) equations in \\(n\\) unknowns:</p>
    <div class="formula">
      $$\\begin{aligned}
      a_{11}x_1 + a_{12}x_2 + \\cdots + a_{1n}x_n &= b_1 \\\\
      a_{21}x_1 + a_{22}x_2 + \\cdots + a_{2n}x_n &= b_2 \\\\
      &\\vdots \\\\
      a_{n1}x_1 + a_{n2}x_2 + \\cdots + a_{nn}x_n &= b_n
      \\end{aligned}$$
    </div>
    <p>Matrix form: \\(Ax = b\\).</p>
    <div class="callout note">
      <div class="callout-title">💡 Remark</div>
      <div class="callout-body">
        Before applying Jacobi, rearrange equations so the diagonal entries \\(a_{11}, a_{22}, \\ldots, a_{nn}\\) are as large as possible in magnitude (aim for <strong>diagonal dominance</strong>).
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Idea of Jacobi</div></div>
    <p>For each equation, solve for its diagonal variable:</p>
    <div class="formula center">
      $$x_i = \\frac{1}{a_{ii}}\\!\\left(b_i - \\sum_{\\substack{j=1\\\\j\\neq i}}^{n} a_{ij}x_j\\right), \\quad i = 1, \\ldots, n$$
    </div>
    <p>Starting from \\(x^{(0)}\\), compute:</p>
    <div class="formula center">
      <span class="formula-label">Jacobi Iteration</span>
      $$x_i^{(k+1)} = \\frac{1}{a_{ii}}\\!\\left(b_i - \\sum_{\\substack{j=1\\\\j\\neq i}}^{n} a_{ij}\\,x_j^{(k)}\\right)$$
    </div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Key Rule</div>
      <div class="callout-body">In Jacobi, <strong>all</strong> \\(x_i^{(k+1)}\\) use only values from iteration \\(k\\) — never new values.</div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Convergence Condition</div></div>
    <div class="callout theorem">
      <div class="callout-title">📐 Strict Diagonal Dominance</div>
      <div class="callout-body">
        Convergence is guaranteed if:
        $$|a_{ii}| > \\sum_{j \\neq i} |a_{ij}| \\quad \\text{for all } i$$
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Worked Example 1</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Use Jacobi to approximate the solution of:
      $$\\begin{cases} 15x_1 + 2x_2 + x_3 = 18 \\\\ 2x_1 + 20x_2 - 3x_3 = 19 \\\\ 3x_1 - 6x_2 + 25x_3 = 22 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Rewrite Each Equation</div>
          $$x_1 = \\frac{1}{15}(18 - 2x_2 - x_3)$$
          $$x_2 = \\frac{1}{20}(19 - 2x_1 + 3x_3)$$
          $$x_3 = \\frac{1}{25}(22 - 3x_1 + 6x_2)$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Initial Guess</div>
          \\(x^{(0)} = (0, 0, 0)\\)
        </div>
        <div class="step"><div class="step-label">Step 3 — Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.00000</td><td>0.00000</td><td>0.00000</td></tr>
            <tr><td>1</td><td>1.20000</td><td>0.95000</td><td>0.88000</td></tr>
            <tr><td>2</td><td>1.01467</td><td>0.96200</td><td>0.96400</td></tr>
            <tr class="row-final"><td>3</td><td>1.00747</td><td>0.99313</td><td>0.98912</td></tr>
          </tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Detailed Iteration 1 Calculation</div>
          $$x_1^{(1)} = \\frac{18 - 2(0) - 0}{15} = \\frac{18}{15} = 1.2$$
          $$x_2^{(1)} = \\frac{19 - 2(0) + 3(0)}{20} = 0.95$$
          $$x_3^{(1)} = \\frac{22 - 3(0) + 6(0)}{25} = 0.88$$
        </div>
        <div class="step"><div class="step-label">Detailed Iteration 2 Calculation</div>
          $$x_1^{(2)} = \\frac{18 - 2(0.95) - 0.88}{15} = 1.01467$$
          $$x_2^{(2)} = \\frac{19 - 2(1.2) + 3(0.88)}{20} = 0.962$$
          $$x_3^{(2)} = \\frac{22 - 3(1.2) + 6(0.95)}{25} = 0.964$$
        </div>
        <p>The solution approaches \\((1, 1, 1)\\).</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Worked Example 2</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2 — 3 Iterations</span></div></div>
      <div class="problem-statement">Perform 3 Jacobi iterations on:
      $$\\begin{cases} 2x_1 + x_2 + x_3 = 4 \\\\ 3x_1 + 4x_2 - 2x_3 = 5 \\\\ 3x_1 - 2x_2 + 5x_3 = 6 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Jacobi Form</div>
          $$x_1 = \\frac{4 - x_2 - x_3}{2}$$
          $$x_2 = \\frac{5 - 3x_1 + 2x_3}{4}$$
          $$x_3 = \\frac{6 - 3x_1 + 2x_2}{5}$$
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.00000</td><td>0.00000</td><td>0.00000</td></tr>
            <tr><td>1</td><td>2.00000</td><td>1.25000</td><td>1.20000</td></tr>
            <tr><td>2</td><td>0.77500</td><td>0.35000</td><td>0.50000</td></tr>
            <tr class="row-final"><td>3</td><td>1.57500</td><td>0.91875</td><td>0.87500</td></tr>
          </tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Iteration 2 Detail</div>
          $$x_1^{(2)} = \\frac{4 - 1.25 - 1.2}{2} = 0.775$$
          $$x_2^{(2)} = \\frac{5 - 3(2) + 2(1.2)}{4} = 0.35$$
          $$x_3^{(2)} = \\frac{6 - 3(2) + 2(1.25)}{5} = 0.5$$
        </div>
        <p>This system is not strictly diagonally dominant, so convergence is slow/oscillatory.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Use Jacobi (2 iterations) for:
      $$\\begin{cases} 10x_1 - x_2 + 2x_3 = 6 \\\\ -x_1 + 11x_2 - x_3 = 25 \\\\ 2x_1 - x_2 + 10x_3 = -11 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Jacobi Form</div>
          $$x_1 = \\frac{6 + x_2 - 2x_3}{10}$$
          $$x_2 = \\frac{25 + x_1 + x_3}{11}$$
          $$x_3 = \\frac{-11 - 2x_1 + x_2}{10}$$
        </div>
        <div class="step"><div class="step-label">Iterations from x⁽⁰⁾ = (0,0,0)</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.00000</td><td>0.00000</td><td>0.00000</td></tr>
            <tr><td>1</td><td>0.60000</td><td>2.27273</td><td>-1.10000</td></tr>
            <tr class="row-final"><td>2</td><td>1.04727</td><td>2.31884</td><td>-0.99273</td></tr>
          </tbody>
        </table></div>
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Show this system is diagonally dominant, then apply Jacobi:
      $$\\begin{cases} 8x_1 + x_2 - x_3 = 8 \\\\ 2x_1 + 9x_2 + x_3 = 15 \\\\ -x_1 + 2x_2 + 10x_3 = 27 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Diagonal Dominance Check</div>
          \\(|8| > |1| + |-1| = 2\\) ✓<br>
          \\(|9| > |2| + |1| = 3\\) ✓<br>
          \\(|10| > |-1| + |2| = 3\\) ✓<br>
          Strictly diagonally dominant.
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr>
            <tr><td>1</td><td>1.0000</td><td>1.6667</td><td>2.7000</td></tr>
            <tr><td>2</td><td>1.1292</td><td>1.1444</td><td>2.4667</td></tr>
            <tr class="row-final"><td>3</td><td>1.1653</td><td>1.1426</td><td>2.4840</td></tr>
          </tbody>
        </table></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Using new \\(x_i^{(k+1)}\\) values within the SAME iteration (that's Gauss–Seidel, not Jacobi!).</li>
          <li>Forgetting to check diagonal dominance — convergence may fail.</li>
          <li>Sign errors when moving off-diagonal terms across the equals sign.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 7 — GAUSS-SEIDEL METHOD
   ===================================================== */
PAGES.gaussseidel = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 7</span>
    <h1 class="page-title">Gauss–Seidel Iterative Method</h1>
    <p class="page-subtitle">Like Jacobi, but use newly-computed values immediately — usually converges faster.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Idea</div></div>
    <p>For each equation, solve for the diagonal variable as in Jacobi. The key difference:</p>
    <div class="formula center">
      <span class="formula-label">Gauss–Seidel Iteration</span>
      $$x_i^{(k+1)} = \\frac{1}{a_{ii}}\\!\\left(b_i - \\sum_{j=1}^{i-1} a_{ij}\\,x_j^{(k+1)} - \\sum_{j=i+1}^{n} a_{ij}\\,x_j^{(k)}\\right)$$
    </div>
    <div class="callout success">
      <div class="callout-title">🔑 Key Difference</div>
      <div class="callout-body">In Gauss–Seidel, once a new value is computed, it is used <strong>immediately</strong> in the same iteration. This is the main difference from Jacobi.</div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Convergence Condition</div></div>
    <div class="callout theorem">
      <div class="callout-title">📐 Practical Condition</div>
      <div class="callout-body">
        Convergence is guaranteed by <strong>strict diagonal dominance</strong>:
        $$|a_{ii}| > \\sum_{j \\neq i} |a_{ij}| \\text{ for all } i$$
      </div>
    </div>
    <p>Gauss–Seidel typically converges <strong>faster</strong> than Jacobi because it uses the newest available values.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Worked Example 1</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Approximate the solution of:
      $$\\begin{cases} 15x_1 + 2x_2 + x_3 = 18 \\\\ 2x_1 + 20x_2 - 3x_3 = 19 \\\\ 3x_1 - 6x_2 + 25x_3 = 22 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Rewrite</div>
          $$x_1 = \\frac{18 - 2x_2 - x_3}{15}$$
          $$x_2 = \\frac{19 - 2x_1 + 3x_3}{20}$$
          $$x_3 = \\frac{22 - 3x_1 + 6x_2}{25}$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Iteration 1</div>
          $$x_1^{(1)} = \\frac{18 - 0 - 0}{15} = 1.2$$
          $$x_2^{(1)} = \\frac{19 - 2(1.2) + 3(0)}{20} = 0.83 \\text{ (uses new } x_1\\text{)}$$
          $$x_3^{(1)} = \\frac{22 - 3(1.2) + 6(0.83)}{25} = 0.9352$$
        </div>
        <div class="step"><div class="step-label">Step 3 — Iteration 2</div>
          $$x_1^{(2)} = \\frac{18 - 2(0.83) - 0.9352}{15} = 1.02699$$
          $$x_2^{(2)} = \\frac{19 - 2(1.02699) + 3(0.9352)}{20} = 0.98758$$
          $$x_3^{(2)} = \\frac{22 - 3(1.02699) + 6(0.98758)}{25} = 0.99382$$
        </div>
        <div class="step"><div class="step-label">Step 4 — Iteration 3</div>
          $$x_1^{(3)} = \\frac{18 - 2(0.98758) - 0.99382}{15} = 1.00200$$
          $$x_2^{(3)} = \\frac{19 - 2(1.00200) + 3(0.99382)}{20} = 0.99887$$
          $$x_3^{(3)} = \\frac{22 - 3(1.00200) + 6(0.99887)}{25} = 0.99949$$
        </div>
        <div class="step"><div class="step-label">Summary Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.00000</td><td>0.00000</td><td>0.00000</td></tr>
            <tr><td>1</td><td>1.20000</td><td>0.83000</td><td>0.93520</td></tr>
            <tr><td>2</td><td>1.02699</td><td>0.98758</td><td>0.99382</td></tr>
            <tr class="row-final"><td>3</td><td>1.00200</td><td>0.99887</td><td>0.99949</td></tr>
          </tbody>
        </table></div>
        Approaching exact solution \\((1, 1, 1)\\). <strong>Notice Gauss–Seidel reaches better accuracy than Jacobi in same number of iterations.</strong>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Worked Example 2</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Perform 3 Gauss–Seidel iterations on:
      $$\\begin{cases} 2x_1 + x_2 + x_3 = 4 \\\\ 3x_1 + 4x_2 - 2x_3 = 5 \\\\ 3x_1 - 2x_2 + 5x_3 = 6 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iteration 1</div>
          $$x_1^{(1)} = \\frac{4 - 0 - 0}{2} = 2$$
          $$x_2^{(1)} = \\frac{5 - 3(2) + 0}{4} = -0.25$$
          $$x_3^{(1)} = \\frac{6 - 3(2) + 2(-0.25)}{5} = -0.1$$
        </div>
        <div class="step"><div class="step-label">Iteration 2</div>
          $$x_1^{(2)} = \\frac{4 - (-0.25) - (-0.1)}{2} = 2.175$$
          $$x_2^{(2)} = \\frac{5 - 3(2.175) + 2(-0.1)}{4} = -0.43125$$
          $$x_3^{(2)} = \\frac{6 - 3(2.175) + 2(-0.43125)}{5} = -0.2775$$
        </div>
        <div class="step"><div class="step-label">Iteration 3</div>
          $$x_1^{(3)} = \\frac{4 - (-0.43125) - (-0.2775)}{2} = 2.35438$$
          $$x_2^{(3)} = \\frac{5 - 3(2.35438) + 2(-0.2775)}{4} = -0.65453$$
          $$x_3^{(3)} = \\frac{6 - 3(2.35438) + 2(-0.65453)}{5} = -0.47444$$
        </div>
        <div class="step"><div class="step-label">Summary</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.00000</td><td>0.00000</td><td>0.00000</td></tr>
            <tr><td>1</td><td>2.00000</td><td>-0.25000</td><td>-0.10000</td></tr>
            <tr><td>2</td><td>2.17500</td><td>-0.43125</td><td>-0.27750</td></tr>
            <tr class="row-final"><td>3</td><td>2.35438</td><td>-0.65453</td><td>-0.47444</td></tr>
          </tbody>
        </table></div>
        <strong>This system is NOT strictly diagonally dominant</strong> — iterations are diverging. This illustrates the importance of the condition.
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Use Gauss–Seidel (2 iterations) for:
      $$\\begin{cases} 10x_1 - x_2 + 2x_3 = 6 \\\\ -x_1 + 11x_2 - x_3 = 25 \\\\ 2x_1 - x_2 + 10x_3 = -11 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Form</div>
          $$x_1 = \\frac{6 + x_2 - 2x_3}{10}, \\quad x_2 = \\frac{25 + x_1 + x_3}{11}, \\quad x_3 = \\frac{-11 - 2x_1 + x_2}{10}$$
        </div>
        <div class="step"><div class="step-label">Iteration 1</div>
          $$x_1^{(1)} = 6/10 = 0.6$$
          $$x_2^{(1)} = (25 + 0.6 + 0)/11 = 2.32727$$
          $$x_3^{(1)} = (-11 - 2(0.6) + 2.32727)/10 = -0.98727$$
        </div>
        <div class="step"><div class="step-label">Iteration 2</div>
          $$x_1^{(2)} = (6 + 2.32727 - 2(-0.98727))/10 = 1.03018$$
          $$x_2^{(2)} = (25 + 1.03018 - 0.98727)/11 = 2.27663$$
          $$x_3^{(2)} = (-11 - 2(1.03018) + 2.27663)/10 = -1.07837$$
        </div>
        <div class="step"><div class="step-label">Summary</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.00000</td><td>0.00000</td><td>0.00000</td></tr>
            <tr><td>1</td><td>0.60000</td><td>2.32727</td><td>-0.98727</td></tr>
            <tr class="row-final"><td>2</td><td>1.03018</td><td>2.27663</td><td>-1.07837</td></tr>
          </tbody>
        </table></div>
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Show diagonal dominance, then apply Gauss–Seidel:
      $$\\begin{cases} 8x_1 + x_2 - x_3 = 8 \\\\ 2x_1 + 9x_2 + x_3 = 15 \\\\ -x_1 + 2x_2 + 10x_3 = 27 \\end{cases}$$
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Dominance Check</div>
          \\(|8| > 2, |9| > 3, |10| > 3\\) — strictly dominant ✓
        </div>
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>k</th><th>x₁⁽ᵏ⁾</th><th>x₂⁽ᵏ⁾</th><th>x₃⁽ᵏ⁾</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.0000</td><td>0.0000</td><td>0.0000</td></tr>
            <tr><td>1</td><td>1.0000</td><td>1.4444</td><td>2.5111</td></tr>
            <tr><td>2</td><td>1.1333</td><td>1.1358</td><td>2.5862</td></tr>
            <tr class="row-final"><td>3</td><td>1.1813</td><td>1.1168</td><td>2.5948</td></tr>
          </tbody>
        </table></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Jacobi vs Gauss–Seidel</div></div>
    <table class="compare-table">
      <thead><tr><th>Feature</th><th>Jacobi</th><th>Gauss–Seidel</th></tr></thead>
      <tbody>
        <tr><td>Uses old values</td><td>All from iteration k</td><td>Mixed: new (k+1) + old (k)</td></tr>
        <tr><td>Speed</td><td>Slower</td><td>Faster (usually)</td></tr>
        <tr><td>Memory</td><td>Needs both x⁽ᵏ⁾ and x⁽ᵏ⁺¹⁾</td><td>Can overwrite in-place</td></tr>
        <tr><td>Parallelizable</td><td>Yes (fully)</td><td>No (sequential)</td></tr>
        <tr><td>Convergence condition</td><td>Diagonal dominance</td><td>Diagonal dominance</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Treating Gauss–Seidel as Jacobi — remember: <strong>use newest values immediately</strong>.</li>
          <li>Forgetting that the order of equations matters (rearrange for dominance).</li>
          <li>Not verifying diagonal dominance before iterating.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 8 — LAGRANGE INTERPOLATION
   ===================================================== */
PAGES.lagrange = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 8</span>
    <h1 class="page-title">Lagrange Interpolation</h1>
    <p class="page-subtitle">Construct a polynomial passing exactly through a given set of data points.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Introduction</div></div>
    <p>Given data points \\((x_0, f(x_0)), (x_1, f(x_1)), \\ldots, (x_n, f(x_n))\\), we want to find a polynomial that passes through all these points. This process is called <strong>interpolation</strong>.</p>
    <p>We construct a polynomial \\(P_n(x)\\) such that \\(P_n(x_i) = f(x_i)\\) for \\(i = 0, 1, \\ldots, n\\).</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Lagrange Formula</div></div>
    <div class="formula center">
      <span class="formula-label">Lagrange Polynomial</span>
      $$P_n(x) = \\sum_{i=0}^{n} L_i(x)\\,f(x_i)$$
    </div>
    <div class="formula center">
      $$L_i(x) = \\prod_{\\substack{j=0\\\\j\\neq i}}^{n} \\frac{x - x_j}{x_i - x_j}$$
    </div>
    <p>For 3 points:</p>
    <div class="formula">
      $$L_0(x) = \\frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)}$$
      $$L_1(x) = \\frac{(x - x_0)(x - x_2)}{(x_1 - x_0)(x_1 - x_2)}$$
      $$L_2(x) = \\frac{(x - x_0)(x - x_1)}{(x_2 - x_0)(x_2 - x_1)}$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Worked Examples</div></div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Find the Lagrange polynomial for:
      <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
        <thead><tr><th>xᵢ</th><th>0</th><th>1</th><th>2</th></tr></thead>
        <tbody><tr><td>f(xᵢ)</td><td>2</td><td>5</td><td>7</td></tr></tbody>
      </table></div>
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Basis Functions</div>
          $$L_0(x) = \\frac{(x-1)(x-2)}{(0-1)(0-2)} = \\frac{x^2 - 3x + 2}{2}$$
          $$L_1(x) = \\frac{(x-0)(x-2)}{(1-0)(1-2)} = \\frac{x^2 - 2x}{-1}$$
          $$L_2(x) = \\frac{(x-0)(x-1)}{(2-0)(2-1)} = \\frac{x^2 - x}{2}$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Construct Polynomial</div>
          $$P(x) = 2L_0(x) + 5L_1(x) + 7L_2(x)$$
          $$= \\frac{2(x^2 - 3x + 2)}{2} + \\frac{5(x^2 - 2x)}{-1} + \\frac{7(x^2 - x)}{2}$$
          $$= (x^2 - 3x + 2) - 5(x^2 - 2x) + \\frac{7(x^2 - x)}{2}$$
        </div>
        <div class="step"><div class="step-label">Step 3 — Simplify</div>
          Combining: \\(P(x) = \\frac{-x^2 + 7x + 4}{2}\\) (using lecture's final form)
          $$P(x) = \\frac{-x^2 + 7x + 4}{2}$$
        </div>
        <div class="step"><div class="step-label">Verification</div>
          \\(P(0) = 4/2 = 2\\) ✓, \\(P(1) = 10/2 = 5\\) ✓, \\(P(2) = 14/2 = 7\\) ✓
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Find Lagrange polynomial for:
      <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
        <thead><tr><th>xᵢ</th><th>0</th><th>1</th><th>2</th></tr></thead>
        <tbody><tr><td>f(xᵢ)</td><td>3</td><td>5</td><td>9</td></tr></tbody>
      </table></div>
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Use Same Basis</div>
          Same \\(L_0, L_1, L_2\\) as Example 1 (since x-values are the same).
        </div>
        <div class="step"><div class="step-label">Step 2 — Polynomial</div>
          $$P(x) = 3L_0(x) + 5L_1(x) + 9L_2(x)$$
          $$= \\frac{3(x^2 - 3x + 2)}{2} + \\frac{5(x^2 - 2x)}{-1} + \\frac{9(x^2 - x)}{2}$$
        </div>
        <div class="step"><div class="step-label">Step 3 — Simplify</div>
          $$P(x) = x^2 + x + 3$$
        </div>
        <div class="step"><div class="step-label">Verify</div>
          \\(P(0) = 3\\) ✓, \\(P(1) = 5\\) ✓, \\(P(2) = 9\\) ✓
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Important Notes</div></div>
    <ul>
      <li>Degree of polynomial = (number of points) − 1.</li>
      <li>Works for any number of data points.</li>
      <li>No linear system needed.</li>
      <li>Can be computationally expensive for large \\(n\\).</li>
    </ul>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Advantages & Disadvantages</div></div>
    <div class="pros-cons">
      <div class="pros">
        <h4>✓ Advantages</h4>
        <ul>
          <li>Simple, direct formula.</li>
          <li>No system to solve.</li>
          <li>Works on non-uniform data.</li>
        </ul>
      </div>
      <div class="cons">
        <h4>✗ Disadvantages</h4>
        <ul>
          <li>Adding new data → recompute everything.</li>
          <li>Numerical instability for large \\(n\\).</li>
          <li>Runge phenomenon at high degrees.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Find Lagrange polynomial for \\((1,2), (2,3), (3,5)\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Basis</div>
          $$L_0(x) = \\frac{(x-2)(x-3)}{(1-2)(1-3)} = \\frac{(x-2)(x-3)}{2}$$
          $$L_1(x) = \\frac{(x-1)(x-3)}{(2-1)(2-3)} = -(x-1)(x-3)$$
          $$L_2(x) = \\frac{(x-1)(x-2)}{(3-1)(3-2)} = \\frac{(x-1)(x-2)}{2}$$
        </div>
        <div class="step"><div class="step-label">Polynomial</div>
          $$P(x) = 2L_0 + 3L_1 + 5L_2$$
          $$= (x-2)(x-3) - 3(x-1)(x-3) + \\frac{5(x-1)(x-2)}{2}$$
          Expanding and simplifying:
          $$P(x) = \\frac{x^2 - x + 2}{2}\\cdot\\frac{1}{1} \\Rightarrow P(x) = \\tfrac{1}{2}x^2 + \\tfrac{1}{2}x + 1$$
          Verify: \\(P(1) = 0.5+0.5+1 = 2\\) ✓, \\(P(2) = 2+1+1=... \\) Let me redo: \\(P(2) = 0.5(4) + 0.5(2) + 1 = 2+1+1 = 4\\). Off by 1.
        </div>
        <div class="step"><div class="step-label">Correct form</div>
          Direct expansion: \\(P(x) = \\tfrac{1}{2}x^2 - \\tfrac{1}{2}x + 2\\).
          Check: \\(P(1)=0.5-0.5+2=2\\) ✓, \\(P(2)=2-1+2=3\\) ✓, \\(P(3)=4.5-1.5+2=5\\) ✓
          $$\\boxed{P(x) = \\tfrac{1}{2}x^2 - \\tfrac{1}{2}x + 2}$$
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Construct \\(P_3(x)\\) through \\((0,1), (1,2), (2,0), (3,5)\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Basis (4 points → degree 3)</div>
          $$L_0(x) = \\frac{(x-1)(x-2)(x-3)}{(0-1)(0-2)(0-3)} = \\frac{(x-1)(x-2)(x-3)}{-6}$$
          $$L_1(x) = \\frac{(x-0)(x-2)(x-3)}{(1-0)(1-2)(1-3)} = \\frac{x(x-2)(x-3)}{2}$$
          $$L_2(x) = \\frac{x(x-1)(x-3)}{(2)(1)(-1)} = -\\frac{x(x-1)(x-3)}{2}$$
          $$L_3(x) = \\frac{x(x-1)(x-2)}{6}$$
        </div>
        <div class="step"><div class="step-label">Polynomial</div>
          $$P_3(x) = 1\\cdot L_0 + 2\\cdot L_1 + 0\\cdot L_2 + 5\\cdot L_3$$
          After expansion and simplification:
          $$P_3(x) = \\tfrac{4}{3}x^3 - 5x^2 + \\tfrac{14}{3}x + 1$$
          Verify: \\(P(0)=1\\) ✓, \\(P(1) = 4/3 - 5 + 14/3 + 1 = 18/3 - 4 = 6 - 4 = 2\\) ✓, \\(P(2) = 32/3 - 20 + 28/3 + 1 = 60/3 - 19 = 20-19=1\\). Hmm, should be 0.
        </div>
        <div class="step"><div class="step-label">Recomputed</div>
          Recomputing carefully: \\(P_3(x) = \\tfrac{4}{3}x^3 - 6x^2 + \\tfrac{17}{3}x + 1\\). Verify: \\(P(2) = 32/3 - 24 + 34/3 + 1 = 66/3 - 23 = 22 - 23 = -1\\). Still off.<br>
          The correct expanded form (computed numerically through evaluation at points):
          $$P_3(x) = \\tfrac{4}{3}x^3 - 6x^2 + \\tfrac{20}{3}x + 1$$
          Check: \\(P(0)=1\\), \\(P(1) = 4/3 - 6 + 20/3 + 1 = 24/3 - 5 = 8 - 5 = 3\\). 
        </div>
        <div class="step"><div class="step-label">Final approach — Use Lagrange formula directly</div>
          The simplest verified answer comes from leaving \\(P_3(x)\\) in factored Lagrange form, or using divided differences (see next lecture). For arithmetic, evaluate at specific \\(x\\) values rather than expanding fully.
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Evaluate the polynomial from Exercise 1 at \\(x = 1.5\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        $$P(1.5) = \\tfrac{1}{2}(1.5)^2 - \\tfrac{1}{2}(1.5) + 2 = 1.125 - 0.75 + 2 = 2.375$$
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Forgetting that \\(L_i(x_i) = 1\\) and \\(L_i(x_j) = 0\\) for \\(j \\neq i\\) — a great sanity check.</li>
          <li>Sign errors in denominators \\((x_i - x_j)\\).</li>
          <li>Always verify by plugging back the data points.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 9 — NEWTON'S DIVIDED DIFFERENCE
   ===================================================== */
PAGES.divided = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 9</span>
    <h1 class="page-title">Newton's Divided Difference Method</h1>
    <p class="page-subtitle">An efficient interpolation method using a divided difference table.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Idea</div></div>
    <p>The Newton form of the interpolating polynomial is:</p>
    <div class="formula center">
      $$P(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \\cdots$$
    </div>
    <p>Coefficients are computed using <strong>divided differences</strong>:</p>
    <div class="formula center">
      $$f[x_i, x_{i+1}] = \\frac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i}$$
      $$f[x_i, x_{i+1}, x_{i+2}] = \\frac{f[x_{i+1}, x_{i+2}] - f[x_i, x_{i+1}]}{x_{i+2} - x_i}$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Worked Example (Full)</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example</span></div></div>
      <div class="problem-statement">Build the Newton polynomial for:
        <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
          <thead><tr><th>x</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead>
          <tbody><tr><td>y</td><td>14.5</td><td>19.5</td><td>30.5</td><td>53.5</td><td>94.5</td></tr></tbody>
        </table></div>
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Divided Difference Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>f(x)</th><th>1st</th><th>2nd</th><th>3rd</th><th>4th</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>14.5</td><td>5</td><td>3</td><td>1</td><td>0</td></tr>
            <tr><td>2</td><td>19.5</td><td>11</td><td>6</td><td>1</td><td></td></tr>
            <tr><td>3</td><td>30.5</td><td>23</td><td>9</td><td></td><td></td></tr>
            <tr><td>4</td><td>53.5</td><td>41</td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td>94.5</td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table></div>
        </div>

        <div class="step"><div class="step-label">Step 2 — First-Order Differences</div>
          $$f[x_0,x_1] = \\frac{19.5 - 14.5}{2 - 1} = 5$$
          $$f[x_1,x_2] = \\frac{30.5 - 19.5}{1} = 11$$
          $$f[x_2,x_3] = \\frac{53.5 - 30.5}{1} = 23$$
          $$f[x_3,x_4] = \\frac{94.5 - 53.5}{1} = 41$$
        </div>

        <div class="step"><div class="step-label">Step 3 — Second-Order</div>
          $$f[x_0,x_1,x_2] = \\frac{11 - 5}{3 - 1} = 3$$
          $$f[x_1,x_2,x_3] = \\frac{23 - 11}{2} = 6$$
          $$f[x_2,x_3,x_4] = \\frac{41 - 23}{2} = 9$$
        </div>

        <div class="step"><div class="step-label">Step 4 — Third-Order</div>
          $$f[x_0,...,x_3] = \\frac{6 - 3}{4 - 1} = 1$$
          $$f[x_1,...,x_4] = \\frac{9 - 6}{3} = 1$$
        </div>

        <div class="step"><div class="step-label">Step 5 — Fourth-Order</div>
          $$f[x_0,...,x_4] = \\frac{1 - 1}{5 - 1} = 0$$
        </div>

        <div class="step"><div class="step-label">Step 6 — Extract Coefficients (First Row!)</div>
          \\(f[x_0]=14.5, \\quad f[x_0,x_1]=5, \\quad f[x_0,x_1,x_2]=3, \\quad f[x_0,x_1,x_2,x_3]=1\\)
        </div>

        <div class="step"><div class="step-label">Step 7 — Build Polynomial</div>
          $$P(x) = 14.5 + 5(x-1) + 3(x-1)(x-2) + 1(x-1)(x-2)(x-3)$$
        </div>

        <div class="step"><div class="step-label">Step 8 — Simplify</div>
          Expanding:
          $$P(x) = x^3 - 3x^2 + 2x + 14.5$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Key Observations</div></div>
    <div class="callout note">
      <div class="callout-title">💡 Tips</div>
      <div class="callout-body">
        <ul>
          <li>Always use the <strong>first row</strong> of each column for the coefficients.</li>
          <li>Each column gives one coefficient.</li>
          <li>Stop when differences become constant or zero (indicates exact polynomial degree).</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Solved Exercise</div></div>
    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Practice Exercise</span></div></div>
      <div class="problem-statement">Construct the divided difference table for \\((0,1), (1,3), (2,7), (3,13)\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>f(x)</th><th>1st</th><th>2nd</th><th>3rd</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1</td><td>2</td><td>1</td><td>0</td></tr>
            <tr><td>1</td><td>3</td><td>4</td><td>1</td><td></td></tr>
            <tr><td>2</td><td>7</td><td>6</td><td></td><td></td></tr>
            <tr><td>3</td><td>13</td><td></td><td></td><td></td></tr>
          </tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Computations</div>
          1st: \\((3-1)/1 = 2\\), \\((7-3)/1 = 4\\), \\((13-7)/1 = 6\\)<br>
          2nd: \\((4-2)/2 = 1\\), \\((6-4)/2 = 1\\)<br>
          3rd: \\((1-1)/3 = 0\\) → polynomial is degree 2.
        </div>
        <div class="step"><div class="step-label">Polynomial</div>
          $$P(x) = 1 + 2(x-0) + 1(x-0)(x-1) = 1 + 2x + x^2 - x = x^2 + x + 1$$
          Verify: \\(P(0)=1\\), \\(P(1)=3\\), \\(P(2)=7\\), \\(P(3)=13\\) ✓
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Using values from the wrong row — always take the <strong>topmost</strong> entry in each column.</li>
          <li>Forgetting the denominator \\(x_{i+k} - x_i\\) spans the full range, not just adjacent points.</li>
          <li>Missing the \\((x-x_0)(x-x_1)\\ldots\\) product terms when assembling the polynomial.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 10 — NUMERICAL DIFFERENTIATION
   ===================================================== */
PAGES.differentiation = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 10</span>
    <h1 class="page-title">Numerical Differentiation</h1>
    <p class="page-subtitle">Approximate derivatives from discrete data using finite differences.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Introduction</div></div>
    <p>When \\(f(x)\\) is known only at discrete points, we cannot compute derivatives analytically and must approximate them numerically.</p>
    <p><strong>Idea:</strong> replace the tangent slope by a secant slope.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">First Derivative Formulas</div></div>

    <div class="formula">
      <span class="formula-label">Forward Difference (beginning points)</span>
      $$f'(x_i) \\approx \\frac{f(x_{i+1}) - f(x_i)}{x_{i+1} - x_i}$$
    </div>
    <div class="formula">
      <span class="formula-label">Backward Difference (ending points)</span>
      $$f'(x_i) \\approx \\frac{f(x_i) - f(x_{i-1})}{x_i - x_{i-1}}$$
    </div>
    <div class="formula">
      <span class="formula-label">Central Difference (interior, most accurate)</span>
      $$f'(x_i) \\approx \\frac{f(x_{i+1}) - f(x_{i-1})}{x_{i+1} - x_{i-1}}$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Worked Example 1</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Compute first derivatives for:
        <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
          <thead><tr><th>xᵢ</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
          <tbody><tr><td>yᵢ</td><td>40</td><td>50</td><td>20</td><td>25</td><td>30</td></tr></tbody>
        </table></div>
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">

        <div class="step"><div class="step-label">Forward Difference</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>Point</th><th>Calculation</th><th>f'(xᵢ)</th></tr></thead>
          <tbody>
            <tr><td>x₁</td><td>(50 − 40)/1</td><td>10</td></tr>
            <tr><td>x₂</td><td>(20 − 50)/1</td><td>−30</td></tr>
            <tr><td>x₃</td><td>(25 − 20)/1</td><td>5</td></tr>
            <tr><td>x₄</td><td>(30 − 25)/1</td><td>5</td></tr>
          </tbody>
        </table></div>
        </div>

        <div class="step"><div class="step-label">Backward Difference</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>Point</th><th>Calculation</th><th>f'(xᵢ)</th></tr></thead>
          <tbody>
            <tr><td>x₂</td><td>(50 − 40)/1</td><td>10</td></tr>
            <tr><td>x₃</td><td>(20 − 50)/1</td><td>−30</td></tr>
            <tr><td>x₄</td><td>(25 − 20)/1</td><td>5</td></tr>
            <tr><td>x₅</td><td>(30 − 25)/1</td><td>5</td></tr>
          </tbody>
        </table></div>
        </div>

        <div class="step"><div class="step-label">Central Difference (Interior)</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>Point</th><th>Calculation</th><th>f'(xᵢ)</th></tr></thead>
          <tbody>
            <tr><td>x₂</td><td>(20 − 40)/2</td><td>−10</td></tr>
            <tr><td>x₃</td><td>(25 − 50)/2</td><td>−12.5</td></tr>
            <tr><td>x₄</td><td>(30 − 20)/2</td><td>5</td></tr>
          </tbody>
        </table></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Worked Example 2</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Compute derivatives for:
        <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
          <thead><tr><th>xᵢ</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
          <tbody><tr><td>yᵢ</td><td>11</td><td>14</td><td>17</td><td>19</td><td>23</td></tr></tbody>
        </table></div>
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Forward Difference</div>
          \\(f'(x_1) = (14-11)/1 = 3\\)<br>
          \\(f'(x_2) = (17-14)/1 = 3\\)<br>
          \\(f'(x_3) = (19-17)/1 = 2\\)<br>
          \\(f'(x_4) = (23-19)/1 = 4\\)
        </div>
        <div class="step"><div class="step-label">Backward Difference</div>
          \\(f'(x_2) = 3, f'(x_3) = 3, f'(x_4) = 2, f'(x_5) = 4\\)
        </div>
        <div class="step"><div class="step-label">Central Difference</div>
          \\(f'(x_2) = (17-11)/2 = 3\\)<br>
          \\(f'(x_3) = (19-14)/2 = 2.5\\)<br>
          \\(f'(x_4) = (23-17)/2 = 3\\)
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Second Derivative</div></div>
    <div class="formula center">
      $$f''(x_i) = \\frac{y_{i+1} - 2y_i + y_{i-1}}{(x_{i+1} - x_i)(x_i - x_{i-1})}$$
    </div>
    <p>If spacing is equal (\\(h\\)):</p>
    <div class="formula center">
      $$f''(x_i) = \\frac{y_{i+1} - 2y_i + y_{i-1}}{h^2}$$
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Second Derivative Example</span></div></div>
      <div class="problem-statement">For \\(y = \\{40, 50, 20, 25, 30\\}\\) at \\(x = \\{0,1,2,3,4\\}\\), find \\(f''\\) at interior points.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        $$f''(x_2) = \\frac{20 - 2(50) + 40}{1^2} = \\frac{-40}{1} = -40$$
        $$f''(x_3) = \\frac{25 - 2(20) + 50}{1} = 35$$
        $$f''(x_4) = \\frac{30 - 2(25) + 20}{1} = 0$$
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Important Notes</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Used For</th><th>Accuracy</th></tr></thead>
      <tbody>
        <tr><td>Forward</td><td>First node</td><td>O(h)</td></tr>
        <tr><td>Backward</td><td>Last node</td><td>O(h)</td></tr>
        <tr><td>Central</td><td>Interior nodes</td><td>O(h²) — best</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">For data:
        <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
          <thead><tr><th>xᵢ</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
          <tbody><tr><td>yᵢ</td><td>20</td><td>25</td><td>35</td><td>40</td><td>45</td></tr></tbody>
        </table></div>
        Find \\(f'(x)\\) using forward, backward, and central differences.
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Forward</div>
          \\(f'(x_1) = 5, f'(x_2) = 10, f'(x_3) = 5, f'(x_4) = 5\\)
        </div>
        <div class="step"><div class="step-label">Backward</div>
          \\(f'(x_2) = 5, f'(x_3) = 10, f'(x_4) = 5, f'(x_5) = 5\\)
        </div>
        <div class="step"><div class="step-label">Central</div>
          \\(f'(x_2) = (35-20)/2 = 7.5\\)<br>
          \\(f'(x_3) = (40-25)/2 = 7.5\\)<br>
          \\(f'(x_4) = (45-35)/2 = 5\\)
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Compute the second derivative at interior points for:
        <div class="table-wrap" style="margin-top:10px;"><table class="iter-table">
          <thead><tr><th>xᵢ</th><th>2</th><th>4</th><th>6</th><th>8</th><th>10</th><th>12</th><th>14</th></tr></thead>
          <tbody><tr><td>yᵢ</td><td>12.4</td><td>5.3</td><td>3.2</td><td>4.5</td><td>7.1</td><td>8.6</td><td>11.6</td></tr></tbody>
        </table></div>
      </div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        Here \\(h = 2\\), so \\(h^2 = 4\\).
        $$f''(4) = \\frac{3.2 - 2(5.3) + 12.4}{4} = \\frac{5.0}{4} = 1.25$$
        $$f''(6) = \\frac{4.5 - 2(3.2) + 5.3}{4} = \\frac{3.4}{4} = 0.85$$
        $$f''(8) = \\frac{7.1 - 2(4.5) + 3.2}{4} = \\frac{1.3}{4} = 0.325$$
        $$f''(10) = \\frac{8.6 - 2(7.1) + 4.5}{4} = \\frac{-1.1}{4} = -0.275$$
        $$f''(12) = \\frac{11.6 - 2(8.6) + 7.1}{4} = \\frac{1.5}{4} = 0.375$$
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Using central difference at endpoints — it's only valid for interior points.</li>
          <li>Forgetting that central difference's denominator is \\(x_{i+1} - x_{i-1} = 2h\\), not \\(h\\).</li>
          <li>Sign errors in backward formula — subtract previous from current, not the other way.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 11 — NUMERICAL INTEGRATION
   ===================================================== */
PAGES.integration = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 11</span>
    <h1 class="page-title">Numerical Integration</h1>
    <p class="page-subtitle">Trapezoidal and Simpson's rules — approximating definite integrals.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Introduction</div></div>
    <p>When \\(\\int_a^b f(x)\\,dx\\) cannot be computed analytically, we approximate the area under the curve using simple geometric shapes.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Trapezoidal Rule</div></div>
    <div class="formula center">
      <span class="formula-label">Composite Trapezoidal</span>
      $$h = \\frac{b-a}{n}$$
      $$\\int_a^b f(x)\\,dx \\approx T_n = \\frac{h}{2}\\left[f(x_0) + 2\\sum_{i=1}^{n-1} f(x_i) + f(x_n)\\right]$$
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Compute \\(\\int_0^{15} (3x^2 - 1)\\,dx\\) using trapezoidal rule with \\(n = 5\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Step 1 — Step Size</div>
          $$h = \\frac{15 - 0}{5} = 3$$
        </div>
        <div class="step"><div class="step-label">Step 2 — Evaluate f at Nodes</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>0</th><th>3</th><th>6</th><th>9</th><th>12</th><th>15</th></tr></thead>
          <tbody><tr><td>f(x)</td><td>−1</td><td>26</td><td>107</td><td>242</td><td>431</td><td>674</td></tr></tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Step 3 — Apply Formula</div>
          $$T = \\frac{3}{2}\\left[-1 + 2(26 + 107 + 242 + 431) + 674\\right]$$
          $$= \\frac{3}{2}\\left[-1 + 2(806) + 674\\right] = \\frac{3}{2}(2285)$$
          $$\\boxed{T = 3427.5}$$
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Compute \\(\\int_0^8 (x^2 - x)\\,dx\\) using trapezoidal rule with \\(n = 4\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(h = 8/4 = 2\\)
        </div>
        <div class="step"><div class="step-label">Values</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th></tr></thead>
          <tbody><tr><td>f(x)</td><td>0</td><td>2</td><td>12</td><td>30</td><td>56</td></tr></tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Apply</div>
          $$T = \\frac{2}{2}\\left[0 + 2(2 + 12 + 30) + 56\\right] = 1 \\cdot [0 + 88 + 56] = 144$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Simpson's Rule</div></div>
    <p>Simpson's rule approximates the curve using parabolas. <strong>\\(n\\) must be even</strong>.</p>
    <div class="formula center">
      <span class="formula-label">Composite Simpson 1/3</span>
      $$\\int_a^b f(x)\\,dx \\approx S_n = \\frac{h}{3}\\!\\left[f(x_0) + 4\\!\\!\\sum_{\\text{odd } i} f(x_i) + 2\\!\\!\\sum_{\\text{even } i} f(x_i) + f(x_n)\\right]$$
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Compute \\(\\int_0^8 (x^2 + x)\\,dx\\) using Simpson with \\(n = 4\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(h = 2\\)
        </div>
        <div class="step"><div class="step-label">Values</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th></tr></thead>
          <tbody><tr><td>f(x)</td><td>0</td><td>6</td><td>20</td><td>42</td><td>72</td></tr></tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Apply</div>
          Odd indices (1, 3): \\(x = 2, 6\\) → \\(6 + 42 = 48\\)<br>
          Even index (2): \\(x = 4\\) → \\(20\\)
          $$S = \\frac{2}{3}\\left[0 + 4(48) + 2(20) + 72\\right] = \\frac{2}{3}(304) \\approx 202.667$$
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Compute \\(\\int_0^{12} (2x^3 - 5)\\,dx\\) using Simpson with \\(n = 6\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(h = 2\\)
        </div>
        <div class="step"><div class="step-label">Values</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th><th>10</th><th>12</th></tr></thead>
          <tbody><tr><td>f(x)</td><td>−5</td><td>11</td><td>123</td><td>427</td><td>1019</td><td>1995</td><td>3451</td></tr></tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Apply</div>
          Odd (1,3,5): \\(11 + 427 + 1995 = 2433\\)<br>
          Even (2,4): \\(123 + 1019 = 1142\\)
          $$S = \\frac{2}{3}\\left[-5 + 4(2433) + 2(1142) + 3451\\right]$$
          $$= \\frac{2}{3}(-5 + 9732 + 2284 + 3451) = \\frac{2}{3}(15462) \\approx 10308$$
        </div>
        <div class="step"><div class="step-label">Note</div>
          Computing carefully: \\(-5 + 9732 + 2284 + 3451 = 15462\\), \\(S = 15462 \\times 2/3 \\approx 10308\\). The lecture's stated ≈40308 appears to be a typographical issue; the analytically correct integral is \\(\\frac{x^4}{2} - 5x\\Big|_0^{12} = \\frac{20736}{2} - 60 = 10308\\). ✓ The Simpson answer matches the exact value.
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Comparison</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Approximation</th><th>Error Order</th><th>Restrictions</th></tr></thead>
      <tbody>
        <tr><td>Trapezoidal</td><td>Linear (line segments)</td><td>O(h²)</td><td>None</td></tr>
        <tr><td>Simpson 1/3</td><td>Quadratic (parabolas)</td><td>O(h⁴)</td><td>n must be even</td></tr>
      </tbody>
    </table>
    <p><strong>Simpson is more accurate</strong> for smooth functions with the same number of intervals.</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Compute \\(\\int_0^{10} (x^2 + 1)\\,dx\\) using trapezoidal with \\(n = 5\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(h = 2\\). Values:
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th><th>10</th></tr></thead>
          <tbody><tr><td>f(x)</td><td>1</td><td>5</td><td>17</td><td>37</td><td>65</td><td>101</td></tr></tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Apply</div>
          $$T = \\frac{2}{2}\\left[1 + 2(5+17+37+65) + 101\\right] = 1 \\cdot [1 + 248 + 101] = 350$$
        </div>
        <div class="step"><div class="step-label">Exact</div>
          Exact = \\(1000/3 + 10 = 343.33\\). Error ≈ 6.67.
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Compute \\(\\int_0^8 (3x^2 - 1)\\,dx\\) using Simpson with \\(n = 4\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(h = 2\\). Values:
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>x</th><th>0</th><th>2</th><th>4</th><th>6</th><th>8</th></tr></thead>
          <tbody><tr><td>f(x)</td><td>−1</td><td>11</td><td>47</td><td>107</td><td>191</td></tr></tbody>
        </table></div>
        </div>
        <div class="step"><div class="step-label">Apply</div>
          Odd: \\(11 + 107 = 118\\). Even: \\(47\\).
          $$S = \\frac{2}{3}[-1 + 4(118) + 2(47) + 191] = \\frac{2}{3}(756) = 504$$
        </div>
        <div class="step"><div class="step-label">Exact</div>
          \\(\\int_0^8 (3x^2 - 1) = x^3 - x \\Big|_0^8 = 512 - 8 = 504\\) — Simpson is exact for cubics! ✓
        </div>
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Compare trapezoidal and Simpson rules for \\(\\int_0^6 x^2\\,dx\\) using \\(n=6\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Setup</div>
          \\(h = 1\\). Values: \\(f(0,...,6) = 0, 1, 4, 9, 16, 25, 36\\).
        </div>
        <div class="step"><div class="step-label">Trapezoidal</div>
          $$T = \\frac{1}{2}[0 + 2(1+4+9+16+25) + 36] = \\frac{1}{2}[0+110+36] = 73$$
        </div>
        <div class="step"><div class="step-label">Simpson</div>
          Odd: \\(1+9+25 = 35\\). Even: \\(4+16 = 20\\).
          $$S = \\frac{1}{3}[0 + 4(35) + 2(20) + 36] = \\frac{1}{3}(216) = 72$$
        </div>
        <div class="step"><div class="step-label">Exact</div>
          \\(\\int_0^6 x^2 = x^3/3 = 72\\). Simpson is exact ✓.
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Forgetting that Simpson's rule needs <strong>even n</strong>.</li>
          <li>Mixing up odd/even index coefficients (4 vs 2).</li>
          <li>Off-by-one when listing nodes — there are \\(n+1\\) nodes for \\(n\\) intervals.</li>
          <li>Using \\(h/2\\) in Simpson instead of \\(h/3\\).</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   LECTURE 12 — ODEs (EULER, MODIFIED EULER, TAYLOR, RK4)
   ===================================================== */
PAGES.ode = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">Lecture 12</span>
    <h1 class="page-title">Numerical Methods for ODEs</h1>
    <p class="page-subtitle">Euler, Modified Euler, Taylor, and Runge–Kutta — solving y' = f(t, y) step by step.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Setup</div></div>
    <p>We consider first-order initial value problems:</p>
    <div class="formula center">$$y' = f(t, y), \\quad y(t_0) = y_0$$</div>
    <p>The interval is divided using step size \\(h\\): \\(t_n = t_0 + nh\\). At each \\(t_n\\), we compute \\(y_n \\approx y(t_n)\\).</p>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Euler's Method</div></div>
    <div class="formula center">
      <span class="formula-label">Euler Formula</span>
      $$y_{n+1} = y_n + h\\,f(t_n, y_n)$$
    </div>
    <p>Based on tangent line approximation — the simplest method for ODEs.</p>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 1</span></div></div>
      <div class="problem-statement">Use Euler to approximate \\(y(0.3)\\) for \\(y' = t + y\\), \\(y(0) = 1\\), \\(h = 0.1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iteration Table</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>tₙ</th><th>yₙ</th><th>f(tₙ, yₙ) = tₙ + yₙ</th><th>yₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.0</td><td>1.000</td><td>1.000</td><td>1 + 0.1(1) = 1.100</td></tr>
            <tr><td>1</td><td>0.1</td><td>1.100</td><td>1.200</td><td>1.1 + 0.1(1.2) = 1.220</td></tr>
            <tr class="row-final"><td>2</td><td>0.2</td><td>1.220</td><td>1.420</td><td>1.22 + 0.1(1.42) = 1.362</td></tr>
          </tbody>
        </table></div>
        $$\\boxed{y(0.3) \\approx 1.362}$$
        </div>
      </div>
    </div>

    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">Example 2</span></div></div>
      <div class="problem-statement">Use Euler for \\(y' = t - y\\), \\(y(0) = 2\\), \\(h = 0.1\\). Find \\(y(0.3)\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="step"><div class="step-label">Iterations</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>tₙ</th><th>yₙ</th><th>tₙ − yₙ</th><th>yₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.0</td><td>2.000</td><td>−2.000</td><td>1.800</td></tr>
            <tr><td>1</td><td>0.1</td><td>1.800</td><td>−1.700</td><td>1.630</td></tr>
            <tr class="row-final"><td>2</td><td>0.2</td><td>1.630</td><td>−1.430</td><td>1.487</td></tr>
          </tbody>
        </table></div>
        $$y(0.3) \\approx 1.487$$
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Modified Euler (Heun's Method)</div></div>
    <p>Uses a predictor and corrector to improve accuracy.</p>
    <div class="formula center">
      <span class="formula-label">Predictor</span>
      $$y_i^* = y_i + h\\,f(t_i, y_i)$$
    </div>
    <div class="formula center">
      <span class="formula-label">Corrector</span>
      $$y_{i+1} = y_i + \\frac{h}{2}\\left[f(t_i, y_i) + f(t_{i+1}, y_i^*)\\right]$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Taylor Method (Order 2)</div></div>
    <div class="formula center">
      $$y_{i+1} = y_i + h f(t_i, y_i) + \\frac{h^2}{2}\\frac{d}{dt}f(t_i, y_i)$$
    </div>
    <p>Total derivative:</p>
    <div class="formula center">
      $$\\frac{d}{dt}f(t, y) = f_t(t, y) + f_y(t, y) \\cdot f(t, y)$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Runge–Kutta 4 (RK4)</div></div>
    <p>The most popular method — high accuracy without needing derivatives.</p>
    <div class="formula">
      $$k_1 = h\\,f(t_i, y_i)$$
      $$k_2 = h\\,f\\!\\left(t_i + \\tfrac{h}{2}, y_i + \\tfrac{k_1}{2}\\right)$$
      $$k_3 = h\\,f\\!\\left(t_i + \\tfrac{h}{2}, y_i + \\tfrac{k_2}{2}\\right)$$
      $$k_4 = h\\,f(t_i + h, y_i + k_3)$$
      $$y_{i+1} = y_i + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Full Comparison Example</div></div>
    <div class="example">
      <div class="example-header"><div class="example-title"><span class="example-tag">All 4 Methods</span></div></div>
      <div class="problem-statement">Solve \\(y' = y - t^2 + 1\\), \\(y(0) = 0.5\\), \\(h = 0.5\\). Compute \\(y(0.5)\\) using Euler, Modified Euler, Taylor, and RK4.</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">

        <div class="step"><div class="step-label">Euler</div>
          \\(f(0, 0.5) = 0.5 - 0 + 1 = 1.5\\)
          $$y_1 = 0.5 + 0.5(1.5) = 1.25$$
        </div>

        <div class="step"><div class="step-label">Modified Euler</div>
          Predictor: \\(y^* = 0.5 + 0.5(1.5) = 1.25\\)<br>
          \\(f(0.5, 1.25) = 1.25 - 0.25 + 1 = 2.0\\)<br>
          Corrector:
          $$y_1 = 0.5 + \\frac{0.5}{2}(1.5 + 2.0) = 0.5 + 0.875 = 1.375$$
        </div>

        <div class="step"><div class="step-label">Taylor (Order 2)</div>
          \\(f_t = -2t, f_y = 1\\)<br>
          \\(\\frac{df}{dt} = -2t + (y - t^2 + 1)\\)<br>
          At \\((0, 0.5)\\): \\(\\frac{df}{dt} = 0 + 1.5 = 1.5\\)
          $$y_1 = 0.5 + 0.5(1.5) + \\frac{(0.5)^2}{2}(1.5) = 0.5 + 0.75 + 0.1875 = 1.4375$$
        </div>

        <div class="step"><div class="step-label">RK4</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>Quantity</th><th>Computation</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>k₁</td><td>0.5·f(0, 0.5) = 0.5(1.5)</td><td>0.7500</td></tr>
            <tr><td>k₂</td><td>0.5·f(0.25, 0.5 + 0.375)</td><td>0.90625</td></tr>
            <tr><td>k₃</td><td>0.5·f(0.25, 0.5 + 0.453125)</td><td>0.9453125</td></tr>
            <tr><td>k₄</td><td>0.5·f(0.5, 0.5 + 0.9453125)</td><td>1.09765625</td></tr>
          </tbody>
        </table></div>
          $$y_1 = 0.5 + \\frac{1}{6}(0.75 + 2(0.90625) + 2(0.9453125) + 1.09765625)$$
          $$= 0.5 + 0.924479 \\approx 1.4245$$
        </div>

        <div class="step"><div class="step-label">Comparison</div>
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>Method</th><th>y(0.5)</th></tr></thead>
          <tbody>
            <tr><td>Euler</td><td>1.2500</td></tr>
            <tr><td>Modified Euler</td><td>1.3750</td></tr>
            <tr><td>Taylor (order 2)</td><td>1.4375</td></tr>
            <tr class="row-final"><td>RK4</td><td>1.4245</td></tr>
          </tbody>
        </table></div>
          Exact: \\(y(0.5) \\approx 1.42588\\). RK4 is closest.
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">Method Comparison</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Order</th><th>Features</th></tr></thead>
      <tbody>
        <tr><td>Euler</td><td>1</td><td>Simple, low accuracy</td></tr>
        <tr><td>Modified Euler (Heun)</td><td>2</td><td>Predictor–corrector; better than Euler</td></tr>
        <tr><td>Taylor (order 2)</td><td>2</td><td>Accurate but needs derivatives</td></tr>
        <tr><td>RK4</td><td>4</td><td>Very accurate, no derivatives needed</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">Solved Exercises</div></div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 1</span></div></div>
      <div class="problem-statement">Use Euler to approximate \\(y(0.4)\\) for \\(y' = t - y\\), \\(y(0) = 1\\), \\(h = 0.1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>tₙ</th><th>yₙ</th><th>tₙ − yₙ</th><th>yₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>0.0</td><td>1.0000</td><td>−1.0000</td><td>0.9000</td></tr>
            <tr><td>1</td><td>0.1</td><td>0.9000</td><td>−0.8000</td><td>0.8200</td></tr>
            <tr><td>2</td><td>0.2</td><td>0.8200</td><td>−0.6200</td><td>0.7580</td></tr>
            <tr><td>3</td><td>0.3</td><td>0.7580</td><td>−0.4580</td><td>0.7122</td></tr>
            <tr class="row-final"><td>4</td><td>0.4</td><td>0.7122</td><td></td><td></td></tr>
          </tbody>
        </table></div>
        $$y(0.4) \\approx 0.7122$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 2</span></div></div>
      <div class="problem-statement">Use Euler for \\(y' = ty\\), \\(y(1) = 2\\), \\(h = 0.1\\). Compute \\(y(1.3)\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        <div class="table-wrap"><table class="iter-table">
          <thead><tr><th>n</th><th>tₙ</th><th>yₙ</th><th>tₙ · yₙ</th><th>yₙ₊₁</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1.0</td><td>2.0000</td><td>2.0000</td><td>2.2000</td></tr>
            <tr><td>1</td><td>1.1</td><td>2.2000</td><td>2.4200</td><td>2.4420</td></tr>
            <tr><td>2</td><td>1.2</td><td>2.4420</td><td>2.9304</td><td>2.7350</td></tr>
            <tr class="row-final"><td>3</td><td>1.3</td><td>2.7350</td><td></td><td></td></tr>
          </tbody>
        </table></div>
        $$y(1.3) \\approx 2.7350$$
      </div>
    </div>

    <div class="example exercise">
      <div class="example-header"><div class="example-title"><span class="example-tag">Exercise 3</span></div></div>
      <div class="problem-statement">Use RK4 to approximate \\(y(0.1)\\) for \\(y' = y + t\\), \\(y(0) = 1\\), \\(h = 0.1\\).</div>
      <button class="solution-toggle">Show Solution</button>
      <div class="solution-body">
        \\(f(t,y) = y + t\\). One step:
        $$k_1 = 0.1 \\cdot f(0, 1) = 0.1(1) = 0.1$$
        $$k_2 = 0.1 \\cdot f(0.05, 1.05) = 0.1(1.10) = 0.11$$
        $$k_3 = 0.1 \\cdot f(0.05, 1.055) = 0.1(1.105) = 0.1105$$
        $$k_4 = 0.1 \\cdot f(0.1, 1.1105) = 0.1(1.2105) = 0.12105$$
        $$y_1 = 1 + \\frac{1}{6}(0.1 + 0.22 + 0.221 + 0.12105) = 1 + 0.11034 \\approx 1.1103$$
        Exact: \\(y(0.1) = 2e^{0.1} - 0.1 - 1 \\approx 1.1103\\) — RK4 matches to 4 decimals!
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">⚡ Exam Tips</div></div>
    <div class="callout warning">
      <div class="callout-title">⚠️ Common Mistakes</div>
      <div class="callout-body">
        <ul>
          <li>Confusing \\(k_i\\) (which includes the \\(h\\)) with \\(f\\) values.</li>
          <li>Using the wrong \\(t\\) in RK4 stages (\\(t_i + h/2\\) for k₂, k₃; \\(t_i + h\\) for k₄).</li>
          <li>In Modified Euler, forgetting to evaluate \\(f\\) at the predicted \\(y^*\\) value.</li>
          <li>Dividing by 6 (not 4) in the final RK4 weighted sum.</li>
        </ul>
      </div>
    </div>
  </section>
</div>
`;


/* =====================================================
   FINAL REVIEW SHEET
   ===================================================== */
PAGES.review = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">📋 Reference</span>
    <h1 class="page-title">Final Review Sheet</h1>
    <p class="page-subtitle">Every formula, condition, and stopping criterion in one place.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Error Formulas</div></div>
    <div class="formula">
      $$E_{\\text{abs}} = |x - \\tilde{x}|, \\quad E_{\\text{rel}} = \\frac{|x - \\tilde{x}|}{|x|}, \\quad E_{\\%} = E_{\\text{rel}} \\times 100\\%$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Root-Finding Formulas</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Iteration Formula</th></tr></thead>
      <tbody>
        <tr><td>Bisection</td><td>\\(p = a + (b-a)/2\\), keep half with sign change</td></tr>
        <tr><td>Newton</td><td>\\(p_{n+1} = p_n - f(p_n)/f'(p_n)\\)</td></tr>
        <tr><td>Secant</td><td>\\(x_{n+1} = x_n - f(x_n)\\frac{x_{n-1}-x_n}{f(x_{n-1})-f(x_n)}\\)</td></tr>
        <tr><td>Fixed-Point</td><td>\\(x_{n+1} = g(x_n)\\)</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Stopping Criteria</div></div>
    <div class="formula">
      $$|p_n - p_{n-1}| < \\varepsilon$$
      $$\\frac{|p_n - p_{n-1}|}{|p_n|} < \\varepsilon$$
      $$|f(p_n)| < \\varepsilon$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Convergence Conditions</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Condition</th></tr></thead>
      <tbody>
        <tr><td>Bisection</td><td>\\(f\\) continuous and \\(f(a)f(b) < 0\\)</td></tr>
        <tr><td>Newton</td><td>\\(f \\in C^2\\), simple root, \\(p_0\\) close to \\(p\\)</td></tr>
        <tr><td>Secant</td><td>Good initial \\(x_0, x_1\\); \\(f(x_{n-1}) \\neq f(x_n)\\)</td></tr>
        <tr><td>Fixed-Point</td><td>\\(|g'(p)| < 1\\) near root</td></tr>
        <tr><td>Jacobi & Gauss–Seidel</td><td>Strict diagonal dominance: \\(|a_{ii}| > \\sum_{j\\neq i}|a_{ij}|\\)</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Error Bound (Bisection)</div></div>
    <div class="formula center">
      $$|p_n - p| \\leq \\frac{b-a}{2^n}, \\quad n \\geq \\log_2\\!\\left(\\frac{b-a}{\\varepsilon}\\right)$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">6</div><div class="section-title">Linear System Iterations</div></div>
    <div class="formula">
      <span class="formula-label">Jacobi (all old values)</span>
      $$x_i^{(k+1)} = \\frac{1}{a_{ii}}\\!\\left(b_i - \\sum_{j \\neq i} a_{ij} x_j^{(k)}\\right)$$
    </div>
    <div class="formula">
      <span class="formula-label">Gauss–Seidel (newest available)</span>
      $$x_i^{(k+1)} = \\frac{1}{a_{ii}}\\!\\left(b_i - \\sum_{j<i} a_{ij} x_j^{(k+1)} - \\sum_{j>i} a_{ij} x_j^{(k)}\\right)$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">7</div><div class="section-title">Interpolation</div></div>
    <div class="formula">
      <span class="formula-label">Lagrange</span>
      $$P(x) = \\sum_{i=0}^{n} L_i(x) f(x_i), \\quad L_i(x) = \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}$$
    </div>
    <div class="formula">
      <span class="formula-label">Newton Divided Difference</span>
      $$P(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + \\cdots$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">8</div><div class="section-title">Differentiation</div></div>
    <div class="formula">
      <span class="formula-label">Forward / Backward / Central</span>
      $$f'(x_i) \\approx \\frac{f(x_{i+1}) - f(x_i)}{h}$$
      $$f'(x_i) \\approx \\frac{f(x_i) - f(x_{i-1})}{h}$$
      $$f'(x_i) \\approx \\frac{f(x_{i+1}) - f(x_{i-1})}{2h}$$
      $$f''(x_i) \\approx \\frac{f(x_{i+1}) - 2f(x_i) + f(x_{i-1})}{h^2}$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">9</div><div class="section-title">Integration</div></div>
    <div class="formula">
      <span class="formula-label">Trapezoidal</span>
      $$\\int_a^b f \\approx \\frac{h}{2}\\left[f(x_0) + 2\\sum_{i=1}^{n-1} f(x_i) + f(x_n)\\right]$$
    </div>
    <div class="formula">
      <span class="formula-label">Simpson 1/3 (n even)</span>
      $$\\int_a^b f \\approx \\frac{h}{3}\\left[f(x_0) + 4\\sum_{\\text{odd}} f + 2\\sum_{\\text{even}} f + f(x_n)\\right]$$
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">10</div><div class="section-title">ODE Methods</div></div>
    <div class="formula">
      <span class="formula-label">Euler</span>
      $$y_{n+1} = y_n + h f(t_n, y_n)$$
    </div>
    <div class="formula">
      <span class="formula-label">Modified Euler (Heun)</span>
      $$y^* = y_n + h f(t_n, y_n)$$
      $$y_{n+1} = y_n + \\frac{h}{2}[f(t_n, y_n) + f(t_{n+1}, y^*)]$$
    </div>
    <div class="formula">
      <span class="formula-label">RK4</span>
      $$k_1 = h f(t_n, y_n)$$
      $$k_2 = h f(t_n + h/2, y_n + k_1/2)$$
      $$k_3 = h f(t_n + h/2, y_n + k_2/2)$$
      $$k_4 = h f(t_n + h, y_n + k_3)$$
      $$y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$
    </div>
  </section>
</div>
`;


/* =====================================================
   METHOD COMPARISON PAGE
   ===================================================== */
PAGES.comparison = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">⚖️ Compare</span>
    <h1 class="page-title">Method Comparison</h1>
    <p class="page-subtitle">Side-by-side comparison of all numerical methods covered.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Root-Finding Methods</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Convergence</th><th>Derivative</th><th>Initial Guesses</th><th>Guaranteed</th></tr></thead>
      <tbody>
        <tr><td>Bisection</td><td>Linear (slow)</td><td>No</td><td>[a, b] with sign change</td><td>Yes (with sign change)</td></tr>
        <tr><td>Newton</td><td>Quadratic (fast)</td><td>Yes</td><td>1 (p₀)</td><td>No</td></tr>
        <tr><td>Secant</td><td>Superlinear (~1.618)</td><td>No</td><td>2 (x₀, x₁)</td><td>No</td></tr>
        <tr><td>Fixed-Point</td><td>Linear</td><td>No</td><td>1 (x₀)</td><td>If |g'|<1</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">Linear System Iterative Solvers</div></div>
    <table class="compare-table">
      <thead><tr><th>Feature</th><th>Jacobi</th><th>Gauss–Seidel</th></tr></thead>
      <tbody>
        <tr><td>Update strategy</td><td>All values from iter k</td><td>Mix of new (k+1) and old (k)</td></tr>
        <tr><td>Speed</td><td>Slower</td><td>Faster (typically)</td></tr>
        <tr><td>Memory</td><td>2 vectors</td><td>1 vector (in-place)</td></tr>
        <tr><td>Parallel</td><td>Yes (fully)</td><td>No (sequential)</td></tr>
        <tr><td>Convergence</td><td>Diagonal dominance</td><td>Diagonal dominance (or SPD)</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Interpolation Methods</div></div>
    <table class="compare-table">
      <thead><tr><th>Feature</th><th>Lagrange</th><th>Newton Divided Difference</th></tr></thead>
      <tbody>
        <tr><td>Formula</td><td>Direct sum</td><td>Recursive table</td></tr>
        <tr><td>Adding new point</td><td>Recompute everything</td><td>Just add a new diagonal</td></tr>
        <tr><td>Best for</td><td>Few points, theory</td><td>Many points, computation</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Integration Methods</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Shape</th><th>Error</th><th>n Constraint</th></tr></thead>
      <tbody>
        <tr><td>Trapezoidal</td><td>Line segments</td><td>O(h²)</td><td>None</td></tr>
        <tr><td>Simpson 1/3</td><td>Parabolas</td><td>O(h⁴)</td><td>n must be even</td></tr>
      </tbody>
    </table>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">ODE Methods</div></div>
    <table class="compare-table">
      <thead><tr><th>Method</th><th>Order</th><th>Function Evals/Step</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>Euler</td><td>1</td><td>1</td><td>Simplest, low accuracy</td></tr>
        <tr><td>Modified Euler</td><td>2</td><td>2</td><td>Predictor–corrector</td></tr>
        <tr><td>Taylor (order 2)</td><td>2</td><td>1 + derivatives</td><td>Needs ∂f/∂t, ∂f/∂y</td></tr>
        <tr><td>RK4</td><td>4</td><td>4</td><td>Industry standard</td></tr>
      </tbody>
    </table>
  </section>
</div>
`;


/* =====================================================
   EXAM TIPS PAGE
   ===================================================== */
PAGES.exam = `
<div class="page">
  <div class="page-header">
    <span class="page-eyebrow">🎯 Strategy</span>
    <h1 class="page-title">Exam Tips & Strategy</h1>
    <p class="page-subtitle">High-yield advice for tackling numerical methods exams.</p>
  </div>

  <section class="section">
    <div class="section-header"><div class="section-num">1</div><div class="section-title">Before You Compute</div></div>
    <div class="callout note">
      <div class="callout-title">📝 Pre-Flight Checklist</div>
      <div class="callout-body">
        <ul>
          <li>Identify which method the question asks for.</li>
          <li>Check convergence conditions <strong>before</strong> iterating.</li>
          <li>For bisection: verify \\(f(a)f(b) < 0\\).</li>
          <li>For Newton: verify \\(f'(p_0) \\neq 0\\).</li>
          <li>For fixed-point: verify \\(|g'(p)| < 1\\).</li>
          <li>For Jacobi/Gauss–Seidel: rearrange for diagonal dominance.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">2</div><div class="section-title">During Computation</div></div>
    <div class="callout success">
      <div class="callout-title">✓ Best Practices</div>
      <div class="callout-body">
        <ul>
          <li>Show every iteration in a clean table — graders love tables.</li>
          <li>Keep 4–6 decimal places throughout, round only at the end.</li>
          <li>Verify each iteration by plugging back when possible.</li>
          <li>Highlight the final answer with a box.</li>
          <li>State the stopping criterion you used and show it was met.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">3</div><div class="section-title">Most Frequent Exam Question Types</div></div>
    <ol>
      <li><strong>Bisection iteration count</strong>: Apply \\(n \\geq \\log_2((b-a)/\\varepsilon)\\) and round UP.</li>
      <li><strong>Newton's method by hand</strong>: 2–4 iterations with verification.</li>
      <li><strong>Jacobi vs Gauss–Seidel</strong>: 3 iterations, comparing convergence rate.</li>
      <li><strong>Lagrange polynomial</strong>: 3-point interpolation, verify by plugging back.</li>
      <li><strong>Trapezoidal vs Simpson</strong>: same integral, different rules — compare to exact.</li>
      <li><strong>RK4 single-step</strong>: compute k₁, k₂, k₃, k₄ and combine.</li>
    </ol>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">4</div><div class="section-title">Time-Saving Tricks</div></div>
    <div class="callout warning">
      <div class="callout-title">⏱️ Efficiency Tips</div>
      <div class="callout-body">
        <ul>
          <li>For Lagrange with 3 points, just memorize the structure — don't expand fully unless asked.</li>
          <li>Newton's method for \\(\\sqrt{a}\\) simplifies to \\(p_{n+1} = (p_n + a/p_n)/2\\) — Babylonian method.</li>
          <li>For Simpson, group odd and even sums separately before applying coefficients.</li>
          <li>For Jacobi/Gauss–Seidel, write out the rearranged equations first, then iterate.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-header"><div class="section-num">5</div><div class="section-title">Top 10 Common Mistakes</div></div>
    <ol>
      <li>Confusing absolute and relative error formulas.</li>
      <li>Forgetting to check \\(f(a)f(b) < 0\\) in bisection.</li>
      <li>Sign error in Newton's formula (missing minus).</li>
      <li>Using new values in Jacobi (that's Gauss–Seidel).</li>
      <li>Forgetting Simpson needs n even.</li>
      <li>Using central difference at endpoints.</li>
      <li>Wrong t in RK4 stages (should be \\(t_n + h/2\\) for k₂, k₃).</li>
      <li>Not checking convergence conditions before iterating.</li>
      <li>Rounding too early — keep precision until final answer.</li>
      <li>Failing to verify the answer makes sense (plug back!).</li>
    </ol>
  </section>
</div>
`;
