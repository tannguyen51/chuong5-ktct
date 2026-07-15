// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => observer.observe(el));

// ===== FEATURE CARD FLIP =====
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// ===== MINDMAP BRANCH CLICK =====
document.querySelectorAll('.branch').forEach(branch => {
    branch.addEventListener('click', () => {
        const targetId = branch.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== RELATIONS DIAGRAM INTERACTIVITY =====
const relDetail = document.getElementById('relDetail');
const relData = {
    1: {
        title: 'Người lao động ↔ Người sử dụng lao động',
        content: `<strong>Thống nhất:</strong> Doanh nghiệp hiệu quả → việc làm, thu nhập ổn định cho NLĐ; NLĐ tích cực → tăng lợi nhuận cho doanh nghiệp.<br><br>
                  <strong>Mâu thuẫn:</strong> Trong một thời điểm, lợi nhuận tăng thì tiền lương giảm và ngược lại. Chủ doanh nghiệp muốn cắt giảm chi phí; NLĐ đấu tranh đòi tăng lương.<br><br>
                  <strong>Công cụ bảo vệ:</strong> Công đoàn (cho NLĐ), nghiệp đoàn/hiệp hội nghề nghiệp (cho NSDLĐ).`
    },
    2: {
        title: 'Người SDLĐ ↔ Người SDLĐ',
        content: `<strong>Thống nhất:</strong> Liên kết, hỗ trợ lẫn nhau; chia nhau lợi nhuận bình quân theo vốn đóng góp; tạo thành đội ngũ doanh nhân đóng góp cho phát triển.<br><br>
                  <strong>Mâu thuẫn:</strong> Cạnh tranh quyết liệt trong cùng ngành và giữa các ngành (di chuyển vốn). Doanh nghiệp có giá trị cá biệt cao hơn giá trị xã hội sẽ thua lỗ, phá sản.`
    },
    3: {
        title: 'Người lao động ↔ Người lao động',
        content: `<strong>Thống nhất:</strong> Đoàn kết, thống nhất để thực hiện các yêu sách với giới chủ; thành lập tổ chức bảo vệ quyền lợi.<br><br>
                  <strong>Mâu thuẫn:</strong> Cạnh tranh khi bán sức lao động → tiền lương giảm, một bộ phận bị sa thải nếu cung vượt cầu.<br><br>
                  <strong>Giải pháp:</strong> Đoàn kết, giúp đỡ lẫn nhau trên cơ sở quy định của pháp luật.`
    },
    4: {
        title: 'Cá nhân → Nhóm → Xã hội',
        content: `<strong>Thống nhất:</strong> Cá nhân làm đúng pháp luật → lợi ích xã hội được thực hiện. Xã hội phát triển tạo môi trường thuận lợi cho cá nhân.<br><br>
                  <strong>Mâu thuẫn:</strong> Cá nhân/doanh nghiệp làm hàng giả, trốn thuế... → tổn hại lợi ích xã hội.<br><br>
                  <strong>"Lợi ích nhóm" tiêu cực:</strong> Cần chống quyết liệt khi có sự tham gia của công chức, viên chức lạm dụng quyền lực nhà nước.`
    }
};

document.querySelectorAll('.rel-node').forEach(node => {
    node.addEventListener('click', function() {
        const relId = this.getAttribute('data-rel');
        document.querySelectorAll('.rel-node').forEach(n => n.classList.remove('active-rel'));
        this.classList.add('active-rel');
        const data = relData[relId];
        relDetail.innerHTML = `<h4 style="color:#C41E3A;margin-bottom:12px;">${data.title}</h4><p style="font-size:0.9rem;line-height:1.7;">${data.content}</p>`;
    });
});

// ===== QUIZ =====
const quizData = [
    {
        question: 'Kinh tế thị trường định hướng XHCN ở Việt Nam được Đảng ta khẳng định là mô hình kinh tế tổng quát từ Đại hội nào?',
        options: ['Đại hội VI (1986)', 'Đại hội IX (2001)', 'Đại hội XI (2011)', 'Đại hội XII (2016)'],
        answer: 1
    },
    {
        question: 'Đặc trưng nào sau đây KHÔNG thuộc 5 đặc trưng cơ bản của KTTT định hướng XHCN ở Việt Nam?',
        options: ['Về mục tiêu', 'Về sở hữu và thành phần kinh tế', 'Về tự do hóa hoàn toàn thị trường', 'Về quan hệ phân phối'],
        answer: 2
    },
    {
        question: 'Trong KTTT định hướng XHCN, thành phần kinh tế nào giữ vai trò chủ đạo?',
        options: ['Kinh tế tư nhân', 'Kinh tế tập thể', 'Kinh tế nhà nước', 'Kinh tế có vốn đầu tư nước ngoài'],
        answer: 2
    },
    {
        question: 'Theo Chương 5, lợi ích kinh tế là gì?',
        options: [
            'Là lợi ích tinh thần thu được từ hoạt động văn hóa',
            'Là lợi ích vật chất thu được khi thực hiện các hoạt động kinh tế',
            'Là quyền lực chính trị của giai cấp thống trị',
            'Là tổng sản phẩm quốc dân'
        ],
        answer: 1
    },
    {
        question: 'Có bao nhiêu nhân tố ảnh hưởng đến quan hệ lợi ích kinh tế được đề cập trong Chương 5?',
        options: ['2 nhân tố', '3 nhân tố', '4 nhân tố', '5 nhân tố'],
        answer: 2
    },
    {
        question: 'Mối quan hệ lợi ích nào sau đây là một trong 4 quan hệ lợi ích kinh tế cơ bản?',
        options: [
            'Người lao động với người tiêu dùng',
            'Người lao động với người sử dụng lao động',
            'Người sản xuất với người vận chuyển',
            'Người bán lẻ với người bán buôn'
        ],
        answer: 1
    },
    {
        question: 'Theo Chương 5, vai trò của Nhà nước trong bảo đảm hài hòa các quan hệ lợi ích KHÔNG bao gồm:',
        options: [
            'Bảo vệ lợi ích hợp pháp, tạo môi trường thuận lợi',
            'Điều hòa lợi ích giữa cá nhân - doanh nghiệp - xã hội',
            'Trực tiếp điều hành mọi hoạt động sản xuất kinh doanh',
            'Kiểm soát, ngăn ngừa các quan hệ lợi ích tiêu cực'
        ],
        answer: 2
    },
    {
        question: 'Hoàn thiện thể chế KTTT định hướng XHCN gồm mấy nhóm nhiệm vụ chính?',
        options: ['2 nhóm', '3 nhóm', '4 nhóm', '5 nhóm'],
        answer: 2
    },
    {
        question: 'Quan điểm của Đảng về nguyên tắc trong đổi mới là gì?',
        options: [
            '"Dân là gốc", vì lợi ích của nhân dân, dựa vào nhân dân',
            '"Nhà nước là trung tâm", tập trung quyền lực',
            '"Thị trường tự do", hạn chế can thiệp nhà nước',
            '"Đóng cửa tự lực", không hội nhập quốc tế'
        ],
        answer: 0
    },
    {
        question: 'Mục tiêu cuối cùng của KTTT định hướng XHCN ở Việt Nam là gì?',
        options: [
            'Tối đa hóa lợi nhuận cho doanh nghiệp nhà nước',
            'Trở thành nước tư bản phát triển',
            '"Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"',
            'Xóa bỏ hoàn toàn kinh tế tư nhân'
        ],
        answer: 2
    }
];

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);
let quizSubmitted = false;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizPrev = document.getElementById('quizPrev');
const quizNext = document.getElementById('quizNext');
const quizCounter = document.getElementById('quizCounter');
const quizProgress = document.getElementById('quizProgress');
const quizResult = document.getElementById('quizResult');

function renderQuestion(index) {
    const q = quizData[index];
    quizQuestion.textContent = `Câu ${index + 1}: ${q.question}`;
    quizOptions.innerHTML = '';
    quizFeedback.style.display = 'none';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.classList.add('quiz-option');
        btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;

        if (userAnswers[index] === i) {
            btn.classList.add('selected');
            if (quizSubmitted) {
                if (i === q.answer) {
                    btn.classList.add('correct');
                } else {
                    btn.classList.add('incorrect');
                }
            }
        }

        if (quizSubmitted && i === q.answer && userAnswers[index] !== i) {
            btn.classList.add('correct');
        }

        btn.addEventListener('click', () => {
            if (quizSubmitted) return;
            userAnswers[index] = i;
            renderQuestion(index);
        });

        quizOptions.appendChild(btn);
    });

    if (quizSubmitted) {
        if (userAnswers[index] === quizData[index].answer) {
            quizFeedback.style.display = 'block';
            quizFeedback.style.background = '#eafaf1';
            quizFeedback.style.color = '#27ae60';
            quizFeedback.textContent = '✅ Chính xác! Rất tốt!';
        } else {
            quizFeedback.style.display = 'block';
            quizFeedback.style.background = '#fdecea';
            quizFeedback.style.color = '#e74c3c';
            quizFeedback.textContent = `❌ Chưa đúng. Đáp án đúng là: ${String.fromCharCode(65 + quizData[index].answer)}. ${quizData[index].options[quizData[index].answer]}`;
        }
    }

    quizPrev.disabled = index === 0;
    quizNext.textContent = index === quizData.length - 1 ? 'Nộp bài ✓' : 'Câu sau →';
    quizCounter.textContent = `${index + 1} / ${quizData.length}`;
    quizProgress.style.width = `${((index + 1) / quizData.length) * 100}%`;
}

quizPrev.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion(currentQuestion);
    }
});

quizNext.addEventListener('click', () => {
    if (currentQuestion === quizData.length - 1 && !quizSubmitted) {
        submitQuiz();
        return;
    }
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
});

function submitQuiz() {
    quizSubmitted = true;
    let score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === quizData[i].answer) score++;
    });
    renderQuestion(currentQuestion);

    quizResult.style.display = 'block';
    quizResult.innerHTML = `
        <h3>Kết quả</h3>
        <div class="score">${score} / ${quizData.length}</div>
        <p class="msg">${getScoreMessage(score)}</p>
        <button class="quiz-restart" onclick="restartQuiz()">Làm lại ↻</button>
    `;
}

function getScoreMessage(score) {
    const max = quizData.length;
    if (score === max) return '🏆 Xuất sắc! Bạn đã nắm rất vững Chương 5!';
    if (score >= max * 0.8) return '🌟 Rất giỏi! Bạn hiểu rất tốt nội dung chương này.';
    if (score >= max * 0.6) return '👍 Khá tốt! Hãy ôn lại một vài phần nhé.';
    if (score >= max * 0.4) return '📖 Cần cố gắng thêm, đọc lại chương 5 nhé!';
    return '💪 Hãy đọc kỹ lại Chương 5 để nắm vững kiến thức hơn.';
}

function restartQuiz() {
    quizSubmitted = false;
    currentQuestion = 0;
    userAnswers = new Array(quizData.length).fill(null);
    quizResult.style.display = 'none';
    renderQuestion(0);
}

// Init quiz
renderQuestion(0);

// ===== HERO SCROLL CLICK =====
document.querySelector('.hero-scroll').addEventListener('click', () => {
    document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });
});

console.log('🚀 Chương 5 - Web sáng tạo đã sẵn sàng!');
