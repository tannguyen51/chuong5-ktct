// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HERO CANVAS =====
const canvas = document.getElementById('heroCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 8000);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }
    initParticles();

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 100)})`;
                    ctx.stroke();
                }
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
            ctx.fill();
        });
        animId = requestAnimationFrame(draw);
    }
    draw();
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.neo-card, .glass-card, .sol-card, .char-card, .sr-card, .tl-card, .rel-item, .content-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===== FLIP CARDS (Characteristics & State Roles) =====
document.querySelectorAll('.char-card, .sr-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
});

// ===== TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        btn.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const panels = btn.closest('.tab-container').querySelectorAll('.tab-panel');
        panels.forEach(p => p.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
    });
});

// ===== QUIZ =====
const quizData = [
    { q: 'KTTT định hướng XHCN được Đảng ta khẳng định là mô hình kinh tế tổng quát từ Đại hội nào?', opts: ['Đại hội VI (1986)', 'Đại hội IX (2001)', 'Đại hội XI (2011)', 'Đại hội XIII (2021)'], ans: 1 },
    { q: 'Đặc trưng nào KHÔNG thuộc 5 đặc trưng cơ bản của KTTT định hướng XHCN?', opts: ['Về mục tiêu', 'Về sở hữu và thành phần kinh tế', 'Tự do hóa hoàn toàn thị trường', 'Về quan hệ phân phối'], ans: 2 },
    { q: 'Trong KTTT định hướng XHCN, thành phần kinh tế nào giữ vai trò chủ đạo?', opts: ['Kinh tế tư nhân', 'Kinh tế tập thể', 'Kinh tế nhà nước', 'Kinh tế có vốn FDI'], ans: 2 },
    { q: 'Lợi ích kinh tế được định nghĩa là gì?', opts: ['Lợi ích tinh thần từ hoạt động văn hóa', 'Lợi ích vật chất thu được khi thực hiện hoạt động kinh tế', 'Quyền lực chính trị của giai cấp thống trị', 'Tổng sản phẩm quốc dân'], ans: 1 },
    { q: 'Có bao nhiêu nhân tố ảnh hưởng đến quan hệ lợi ích kinh tế?', opts: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Quan hệ nào là một trong 4 quan hệ lợi ích kinh tế cơ bản?', opts: ['NLĐ với người tiêu dùng', 'NLĐ với người SDLĐ', 'Người sản xuất với người vận chuyển', 'Người bán lẻ với người bán buôn'], ans: 1 },
    { q: 'Vai trò nào của Nhà nước KHÔNG được đề cập trong bảo đảm hài hòa lợi ích?', opts: ['Bảo vệ lợi ích hợp pháp', 'Điều hòa lợi ích', 'Trực tiếp điều hành mọi hoạt động SXKD', 'Giải quyết mâu thuẫn'], ans: 2 },
    { q: 'Hoàn thiện thể chế KTTT định hướng XHCN gồm mấy nhóm nhiệm vụ chính?', opts: ['2', '3', '4', '5'], ans: 2 },
    { q: 'Quan điểm của Đảng về nguyên tắc đổi mới là gì?', opts: ['"Dân là gốc", vì lợi ích nhân dân', 'Nhà nước là trung tâm', 'Thị trường tự do hoàn toàn', 'Đóng cửa tự lực'], ans: 0 },
    { q: 'Mục tiêu cuối cùng của KTTT định hướng XHCN là gì?', opts: ['Tối đa hóa lợi nhuận DNNN', 'Trở thành nước tư bản', '"Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"', 'Xóa bỏ kinh tế tư nhân'], ans: 2 }
];

let qIdx = 0, qAnswers = Array(quizData.length).fill(null), qDone = false;

const qEl = document.getElementById('quizQ');
const oEl = document.getElementById('quizO');
const fbEl = document.getElementById('quizFb');
const prevEl = document.getElementById('quizPrevBtn');
const nextEl = document.getElementById('quizNextBtn');
const countEl = document.getElementById('quizCount');
const progEl = document.getElementById('quizProgressBar');
const resEl = document.getElementById('quizResult');

function renderQuiz() {
    const d = quizData[qIdx];
    qEl.textContent = `Câu ${qIdx + 1}: ${d.q}`;
    oEl.innerHTML = '';
    fbEl.style.display = 'none';

    d.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
        if (qAnswers[qIdx] === i) {
            btn.classList.add('selected');
            if (qDone) btn.classList.add(i === d.ans ? 'correct' : 'incorrect');
        }
        if (qDone && i === d.ans && qAnswers[qIdx] !== i) btn.classList.add('correct');
        btn.addEventListener('click', () => {
            if (qDone) return;
            qAnswers[qIdx] = i;
            renderQuiz();
        });
        oEl.appendChild(btn);
    });

    if (qDone && qAnswers[qIdx] !== null) {
        fbEl.style.display = 'block';
        if (qAnswers[qIdx] === d.ans) {
            fbEl.style.background = 'rgba(15,169,88,0.12)';
            fbEl.style.color = '#0fa958';
            fbEl.textContent = '✅ Chính xác!';
        } else {
            fbEl.style.background = 'rgba(231,76,60,0.12)';
            fbEl.style.color = '#e74c3c';
            fbEl.textContent = `❌ Đáp án đúng: ${String.fromCharCode(65 + d.ans)}. ${d.opts[d.ans]}`;
        }
    }

    prevEl.disabled = qIdx === 0;
    nextEl.textContent = qIdx === quizData.length - 1 ? 'Nộp bài ✓' : 'Sau →';
    countEl.textContent = `${qIdx + 1} / ${quizData.length}`;
    progEl.style.width = `${((qIdx + 1) / quizData.length) * 100}%`;
}

prevEl.addEventListener('click', () => { if (qIdx > 0) { qIdx--; renderQuiz(); } });
nextEl.addEventListener('click', () => {
    if (qIdx === quizData.length - 1 && !qDone) { submitQuiz(); return; }
    if (qIdx < quizData.length - 1) { qIdx++; renderQuiz(); }
});

function submitQuiz() {
    qDone = true;
    const score = qAnswers.reduce((s, a, i) => s + (a === quizData[i].ans ? 1 : 0), 0);
    renderQuiz();
    resEl.style.display = 'block';
    let msg;
    if (score === 10) msg = '🏆 Xuất sắc! Bạn nắm rất vững Chương 5!';
    else if (score >= 8) msg = '🌟 Rất giỏi! Bạn hiểu tốt nội dung.';
    else if (score >= 6) msg = '👍 Khá! Ôn lại một vài phần nhé.';
    else if (score >= 4) msg = '📖 Cần cố gắng thêm.';
    else msg = '💪 Hãy đọc lại Chương 5 nhé.';
    resEl.innerHTML = `<h3>Kết quả</h3><div class="score-big">${score} / 10</div><p class="score-msg">${msg}</p><button class="quiz-retry" onclick="restartQuiz()">Làm lại ↻</button>`;
}

function restartQuiz() {
    qDone = false; qIdx = 0; qAnswers = Array(quizData.length).fill(null);
    resEl.style.display = 'none'; renderQuiz();
}
renderQuiz();

// ===== CHATBOT =====
const chatPanel = document.getElementById('chatPanel');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatQuick = document.getElementById('chatQuick');
let chatOpen = false;

function toggleChat() {
    chatOpen = !chatOpen;
    chatPanel.classList.toggle('open', chatOpen);
    if (chatOpen) setTimeout(() => chatInput.focus(), 200);
}

function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}-msg`;
    div.innerHTML = `<div class="msg-bubble">${text}</div>`;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addThinking() {
    const div = document.createElement('div');
    div.className = 'msg bot-msg thinking';
    div.innerHTML = '<div class="msg-bubble"><em>Đang trả lời...</em></div>';
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
    return div;
}

// Knowledge base for chatbot
const knowledge = {
    // Core concept
    'kttt định hướng xhcn|khái niệm|định nghĩa|kttt là gì|kinh tế thị trường định hướng': 'Kinh tế thị trường định hướng XHCN là <b>nền kinh tế vận hành theo các quy luật của thị trường</b>, đồng thời góp phần hướng tới từng bước xác lập một xã hội <b>"dân giàu, nước mạnh, dân chủ, công bằng, văn minh"</b>; có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo.<br><br>Đây là <b>mô hình kinh tế tổng quát</b> của Việt Nam trong thời kỳ quá độ lên CNXH, được khẳng định từ Đại hội IX (2001).',

    // Necessity
    'tính tất yếu|tại sao|vì sao|vì sao phải|lý do|tất yếu khách quan': 'Có <b>3 lý do</b> phát triển KTTT định hướng XHCN tại Việt Nam:<br><br><b>1. Xu hướng phát triển khách quan:</b> Phù hợp với bối cảnh thế giới. Không có mô hình KTTT chung cho mọi quốc gia. Mỗi nước có đặc thù riêng.<br><br><b>2. Tính ưu việt của KTTT:</b> Là phương thức phân bổ nguồn lực hiệu quả nhất, thúc đẩy LLSX, kích thích tiến bộ kỹ thuật - công nghệ, nâng cao năng suất lao động.<br><br><b>3. Nguyện vọng của nhân dân:</b> Phù hợp khát vọng dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',

    // 5 characteristics
    '5 đặc trưng|đặc trưng|đặc trưng cơ bản|năm đặc trưng': '5 đặc trưng cơ bản của KTTT định hướng XHCN:<br><br><b>1. Về mục tiêu:</b> Phát triển LLSX, xây dựng CSVC-KT của CNXH, thực hiện "dân giàu, nước mạnh, dân chủ, công bằng, văn minh".<br><br><b>2. Về sở hữu & thành phần KT:</b> Nhiều hình thức sở hữu, nhiều thành phần. Kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân là động lực quan trọng.<br><br><b>3. Về quan hệ quản lý:</b> Nhà nước pháp quyền XHCN do Đảng lãnh đạo, chịu sự giám sát của nhân dân.<br><br><b>4. Về quan hệ phân phối:</b> Phân phối theo lao động & hiệu quả kinh tế, theo mức đóng góp vốn + an sinh xã hội.<br><br><b>5. Về gắn tăng trưởng với công bằng:</b> Thực hiện tiến bộ & công bằng ngay trong từng chính sách, từng giai đoạn.',

    // Đại hội timeline
    'đại hội|nhận thức của đảng|lịch sử|quá trình|timeline': 'Quá trình nhận thức của Đảng về KTTT định hướng XHCN:<br><br><b>1986 - ĐH VI:</b> Bắt đầu đổi mới, vận dụng mặt tích cực của kinh tế hàng hóa.<br><br><b>2001 - ĐH IX:</b> Khẳng định KTTT định hướng XHCN là <b>mô hình kinh tế tổng quát</b>.<br><br><b>2011 - ĐH XI:</b> Nhiều thành phần, vận hành theo cơ chế thị trường, Nhà nước quản lý.<br><br><b>2016 - ĐH XII:</b> Vận hành đầy đủ, đồng bộ, hiện đại & hội nhập quốc tế.<br><br><b>2021 - ĐH XIII:</b> Tiếp tục hoàn thiện mô hình.',

    // Institution
    'thể chế|hoàn thiện thể chế|thể chế kinh tế|thể chế kttt': '<b>Thể chế:</b> Quy tắc, luật pháp, bộ máy quản lý & cơ chế vận hành.<br><br><b>Thể chế kinh tế:</b> Điều chỉnh hành vi chủ thể KT và các quan hệ kinh tế.<br><br><b>Thể chế KTTT định hướng XHCN:</b> Hệ thống đường lối, luật pháp, chính sách hướng tới thị trường hiện đại.<br><br><b>3 lý do phải hoàn thiện:</b> (1) Chưa đồng bộ, (2) Chưa đầy đủ, (3) Hiệu lực kém.<br><br><b>4 nhóm nhiệm vụ:</b> A - Sở hữu & thành phần KT; B - Phát triển yếu tố & loại thị trường; C - Gắn kết tăng trưởng với bền vững & hội nhập; D - Nâng cao năng lực lãnh đạo của Đảng.',

    // Economic interest
    'lợi ích kinh tế|lợi ích|lợi ích là gì': '<b>Lợi ích kinh tế</b> là lợi ích vật chất thu được khi thực hiện các hoạt động kinh tế của con người.<br><br><b>Bản chất:</b> Phản ánh mục đích và động cơ của các quan hệ giữa các chủ thể trong nền sản xuất xã hội.<br><br><b>Hai vai trò chính:</b><br>1. Là <b>động lực trực tiếp</b> của các chủ thể và hoạt động kinh tế - xã hội.<br>2. Là <b>cơ sở thúc đẩy</b> sự phát triển các lợi ích khác (chính trị, xã hội, văn hóa).',

    // Factors
    'nhân tố ảnh hưởng|những nhân tố|yếu tố ảnh hưởng': '4 nhân tố ảnh hưởng đến quan hệ lợi ích kinh tế:<br><br><b>1. Trình độ phát triển của LLSX</b> - LLSX càng cao, đáp ứng lợi ích càng tốt.<br><b>2. Địa vị trong hệ thống QHSX</b> - Quan hệ sở hữu quyết định vị trí, vai trò.<br><b>3. Chính sách phân phối thu nhập của Nhà nước</b> - Làm thay đổi mức và tương quan thu nhập.<br><b>4. Hội nhập kinh tế quốc tế</b> - Tác động mạnh và nhiều chiều đến lợi ích các chủ thể.',

    // 4 relations
    '4 quan hệ|bốn quan hệ|quan hệ lợi ích|quan hệ cơ bản': '4 quan hệ lợi ích kinh tế cơ bản:<br><br><b>1. Người LĐ ↔ Người SDLĐ:</b> Thống nhất về việc làm - thu nhập; mâu thuẫn về phân chia lợi nhuận - tiền lương. Công cụ: Công đoàn, nghiệp đoàn.<br><br><b>2. Người SDLĐ ↔ Người SDLĐ:</b> Vừa là đối tác vừa là đối thủ. Cạnh tranh quyết liệt, liên kết thành đội ngũ doanh nhân.<br><br><b>3. Người LĐ ↔ Người LĐ:</b> Cạnh tranh khi bán sức lao động; đoàn kết để bảo vệ quyền lợi.<br><br><b>4. Cá nhân → Nhóm → Xã hội:</b> Cá nhân là nền tảng. "Lợi ích nhóm" tiêu cực cần ngăn chặn.',

    // State role
    'vai trò nhà nước|nhà nước|nhà nước làm gì|vai trò của nhà nước': 'Nhà nước có <b>4 vai trò</b> trong bảo đảm hài hòa quan hệ lợi ích:<br><br><b>1. Bảo vệ lợi ích hợp pháp:</b> Tạo môi trường thuận lợi - ổn định chính trị, pháp luật thông thoáng, kết cấu hạ tầng.<br><br><b>2. Điều hòa lợi ích:</b> Chính sách phân phối thu nhập giữa cá nhân - doanh nghiệp - xã hội; phát triển LLSX & khoa học công nghệ.<br><br><b>3. Kiểm soát, ngăn ngừa tiêu cực:</b> Chống tham nhũng, "lợi ích nhóm", thu nhập bất hợp pháp.<br><br><b>4. Giải quyết mâu thuẫn:</b> Phát hiện kịp thời, hòa giải; đặt lợi ích đất nước lên trên hết.',

    // Ownership
    'sở hữu|thành phần kinh tế|kinh tế nhà nước|kinh tế tư nhân': 'KTTT định hướng XHCN có <b>nhiều hình thức sở hữu, nhiều thành phần kinh tế</b>.<br><br><b>Kinh tế nhà nước</b> giữ vai trò <b>chủ đạo</b>, cùng kinh tế tập thể trở thành nền tảng vững chắc.<br><br><b>Kinh tế tư nhân</b> là <b>động lực quan trọng</b>.<br><br>Các chủ thể thuộc mọi thành phần kinh tế <b>bình đẳng, hợp tác, cạnh tranh</b> theo pháp luật.',

    // Distribution
    'phân phối|quan hệ phân phối|phân phối công bằng': 'Quan hệ phân phối trong KTTT định hướng XHCN:<br><br>- Phân phối <b>công bằng</b> các yếu tố sản xuất (đầu vào)<br>- Phân phối kết quả (đầu ra) chủ yếu theo <b>kết quả lao động, hiệu quả kinh tế, mức đóng góp vốn</b><br>- Kết hợp với <b>an sinh xã hội, phúc lợi xã hội</b><br><br>Các hình thức phân phối phản ánh định hướng XHCN: phân phối theo lao động & hiệu quả kinh tế, phân phối theo phúc lợi.',

    // Growth + Equality
    'tăng trưởng|công bằng|tăng trưởng và công bằng|công bằng xã hội': 'Đặc trưng quan trọng: <b>gắn tăng trưởng kinh tế với công bằng xã hội</b>.<br><br>- Thực hiện tiến bộ & công bằng <b>ngay trong từng chính sách, từng giai đoạn</b><br>- Không chờ kinh tế phát triển cao mới làm<br>- Không "hy sinh" công bằng để chạy theo tăng trưởng<br>- Đầu tư cho xã hội (giáo dục, y tế, văn hóa) là đầu tư cho phát triển bền vững',

    // Market vs Plan
    'thị trường|kế hoạch|kế hoạch hóa|cơ chế thị trường': 'KTTT định hướng XHCN vận hành theo <b>các quy luật của thị trường</b> (giá cả, cạnh tranh, cung cầu), đồng thời có <b>sự điều tiết của Nhà nước</b> thông qua pháp luật, chiến lược, quy hoạch, kế hoạch và các công cụ kinh tế.<br><br>Sự can thiệp của Nhà nước nhằm khắc phục khuyết tật của thị trường, đảm bảo tính bền vững và định hướng XHCN.',

    // Lợi ích nhóm
    'lợi ích nhóm|nhóm lợi ích|tiêu cực|tham nhũng': '"Lợi ích nhóm" và "nhóm lợi ích" tiêu cực là khi có sự tham gia của công chức, viên chức hoặc cơ quan công quyền lạm dụng quyền lực nhà nước phục vụ cho lợi ích cá nhân.<br><br>Đảng và Nhà nước chủ trương <b>chống quyết liệt, thường xuyên</b> các biểu hiện tiêu cực này. Cần công khai, minh bạch, xóa bỏ cơ chế "xin - cho", "duyệt - cấp".',

    // Summary
    'tóm tắt|tổng kết|kết luận|chương 5 nói về': 'Chương 5 gồm <b>3 phần chính</b>:<br><br><b>Phần I:</b> KTTT định hướng XHCN - khái niệm, tính tất yếu (3 lý do), quá trình nhận thức của Đảng (từ ĐH VI đến XIII), 5 đặc trưng cơ bản.<br><br><b>Phần II:</b> Hoàn thiện thể chế - khái niệm thể chế, 3 lý do cần hoàn thiện, 4 nhóm nhiệm vụ chính (ABCD).<br><br><b>Phần III:</b> Quan hệ lợi ích kinh tế - khái niệm & vai trò, 4 nhân tố ảnh hưởng, 4 quan hệ cơ bản, vai trò Nhà nước trong bảo đảm hài hòa.',
};

function findAnswer(question) {
    const q = question.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    for (const [keywords, answer] of Object.entries(knowledge)) {
        const kws = keywords.split('|');
        let score = 0;
        for (const kw of kws) {
            if (q.includes(kw.trim())) score += kw.length;
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = answer;
        }
    }

    if (bestScore > 0) return bestMatch;

    // Fallback
    return 'Xin lỗi, tôi chưa có câu trả lời cho câu hỏi này. Hãy thử hỏi về:<br><br>• Khái niệm KTTT định hướng XHCN<br>• 5 đặc trưng cơ bản<br>• Tính tất yếu khách quan<br>• Hoàn thiện thể chế<br>• Lợi ích kinh tế<br>• 4 quan hệ lợi ích<br>• Vai trò của Nhà nước<br>• Quá trình nhận thức của Đảng';
}

function sendMsg() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    chatQuick.style.display = 'none';
    addMsg(text, 'user');
    const thinking = addThinking();
    setTimeout(() => {
        thinking.remove();
        const answer = findAnswer(text);
        addMsg(answer, 'bot');
    }, 600 + Math.random() * 500);
}

function quickAsk(question) {
    chatQuick.style.display = 'none';
    addMsg(question, 'user');
    const thinking = addThinking();
    setTimeout(() => {
        thinking.remove();
        addMsg(findAnswer(question), 'bot');
    }, 600 + Math.random() * 500);
}

// Make functions globally available
window.toggleChat = toggleChat;
window.sendMsg = sendMsg;
window.quickAsk = quickAsk;
window.restartQuiz = restartQuiz;

console.log('✅ Chương 5 - Web sáng tạo đã sẵn sàng!');
