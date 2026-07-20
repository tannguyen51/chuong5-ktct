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

// ==============================
//  QUIZ — AI LÀ TRIỆU PHÚ STYLE
// ==============================

// ---- 50-CÂU HỎI NGÂN HÀNG ----
const questionBank = [
    // === PHẦN I: KTTT ĐỊNH HƯỚNG XHCN (câu 1-22) ===
    {
        q: 'KTTT định hướng XHCN được Đảng ta khẳng định là mô hình kinh tế tổng quát từ Đại hội nào?',
        opts: ['Đại hội VI (1986)', 'Đại hội IX (2001)', 'Đại hội XI (2011)', 'Đại hội XIII (2021)'],
        ans: 1
    },
    {
        q: 'KTTT định hướng XHCN là nền kinh tế vận hành theo quy luật nào?',
        opts: ['Quy luật kế hoạch hóa tập trung', 'Các quy luật của thị trường', 'Quy luật bao cấp', 'Quy luật tự nhiên'],
        ans: 1
    },
    {
        q: 'Mục tiêu cuối cùng của KTTT định hướng XHCN là gì?',
        opts: ['Tối đa hóa lợi nhuận DNNN', 'Trở thành nước tư bản', '"Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"', 'Xóa bỏ kinh tế tư nhân'],
        ans: 2
    },
    {
        q: 'Ai là người lãnh đạo nền KTTT định hướng XHCN ở Việt Nam?',
        opts: ['Nhà nước pháp quyền', 'Đảng Cộng sản Việt Nam', 'Quốc hội', 'Mặt trận Tổ quốc'],
        ans: 1
    },
    {
        q: 'Đặc trưng nào KHÔNG thuộc 5 đặc trưng cơ bản của KTTT định hướng XHCN?',
        opts: ['Về mục tiêu', 'Về sở hữu và thành phần kinh tế', 'Tự do hóa hoàn toàn thị trường', 'Về quan hệ phân phối'],
        ans: 2
    },
    {
        q: 'Tính tất yếu khách quan của KTTT định hướng XHCN ở Việt Nam KHÔNG bao gồm lý do nào?',
        opts: ['Xu hướng phát triển khách quan của thế giới', 'Tính ưu việt của KTTT', 'Nguyện vọng của nhân dân', 'Sức ép từ các nước tư bản'],
        ans: 3
    },
    {
        q: 'Trong KTTT định hướng XHCN, thành phần kinh tế nào giữ vai trò chủ đạo?',
        opts: ['Kinh tế tư nhân', 'Kinh tế tập thể', 'Kinh tế nhà nước', 'Kinh tế có vốn FDI'],
        ans: 2
    },
    {
        q: 'Kinh tế tư nhân có vai trò gì trong KTTT định hướng XHCN?',
        opts: ['Không có vai trò', 'Giữ vai trò chủ đạo', 'Là động lực quan trọng', 'Giữ vai trò nền tảng'],
        ans: 2
    },
    {
        q: 'Đại hội VI (1986) có ý nghĩa gì trong quá trình phát triển KTTT định hướng XHCN?',
        opts: ['Khẳng định mô hình kinh tế tổng quát', 'Bắt đầu đổi mới, vận dụng mặt tích cực của kinh tế hàng hóa', 'Hoàn thiện thể chế đồng bộ', 'Hội nhập quốc tế sâu rộng'],
        ans: 1
    },
    {
        q: 'Đại hội nào nhấn mạnh KTTT định hướng XHCN vận hành "đầy đủ, đồng bộ"?',
        opts: ['Đại hội IX (2001)', 'Đại hội XI (2011)', 'Đại hội XII (2016)', 'Đại hội XIII (2021)'],
        ans: 2
    },
    {
        q: 'Quan điểm của Đảng về nguyên tắc đổi mới là gì?',
        opts: ['"Dân là gốc", vì lợi ích nhân dân', 'Nhà nước là trung tâm', 'Thị trường tự do hoàn toàn', 'Đóng cửa tự lực'],
        ans: 0
    },
    {
        q: 'Quan hệ phân phối trong KTTT định hướng XHCN chủ yếu dựa trên yếu tố nào?',
        opts: ['Bình quân cho tất cả', 'Kết quả lao động, hiệu quả kinh tế và mức đóng góp vốn', 'Phân phối theo cấp bậc', 'Phân phối theo nhu cầu'],
        ans: 1
    },
    {
        q: 'Đặc trưng về gắn tăng trưởng với công bằng có nghĩa là gì?',
        opts: ['Phát triển kinh tế xong mới làm công bằng', 'Thực hiện tiến bộ và công bằng ngay trong từng chính sách', 'Chỉ tập trung vào tăng trưởng', 'Hy sinh tăng trưởng để có công bằng'],
        ans: 1
    },
    {
        q: 'Bản chất của KTTT định hướng XHCN là gì?',
        opts: ['Kiểu nền KTTT phù hợp với Việt Nam, phản ánh điều kiện lịch sử', 'Mô hình sao chép từ các nước tư bản', 'Nền kinh tế kế hoạch hóa tập trung', 'Mô hình kinh tế bao cấp'],
        ans: 0
    },
    {
        q: 'KTTT định hướng XHCN tồn tại lâu dài ở Việt Nam là do đâu?',
        opts: ['Quyết định của lãnh đạo', 'Điều kiện kinh tế - xã hội khách quan quy định', 'Sức ép từ quốc tế', 'Yêu cầu của nhân dân'],
        ans: 1
    },
    {
        q: 'Đặc trưng về quan hệ quản lý nhấn mạnh điều gì?',
        opts: ['Thị trường tự điều chỉnh', 'Nhà nước pháp quyền XHCN do Đảng lãnh đạo, chịu sự giám sát của nhân dân', 'Doanh nghiệp tư nhân quản lý', 'Quốc tế quản lý'],
        ans: 1
    },
    {
        q: 'Tính ưu việt của KTTT thể hiện ở điểm nào?',
        opts: ['Làm suy yếu LLSX', 'Phân bổ nguồn lực kém hiệu quả', 'Phương thức phân bổ nguồn lực hiệu quả, kích thích tiến bộ kỹ thuật', 'Xóa bỏ cạnh tranh'],
        ans: 2
    },
    {
        q: 'Theo giáo trình, KTTT định hướng XHCN bao hàm những gì?',
        opts: ['Chỉ có đặc trưng riêng của Việt Nam', 'Vừa bao hàm đặc trưng chung của KTTT thế giới, vừa có đặc trưng riêng', 'Chỉ có đặc trưng chung của thế giới', 'Không có đặc trưng riêng'],
        ans: 1
    },
    {
        q: 'Các chủ thể thuộc mọi thành phần kinh tế được đối xử như thế nào?',
        opts: ['Phân biệt đối xử', 'Bình đẳng, hợp tác, cạnh tranh theo pháp luật', 'Chỉ ưu tiên DNNN', 'Chỉ ưu tiên FDI'],
        ans: 1
    },
    {
        q: 'Đại hội XIII (2021) có vai trò gì đối với KTTT định hướng XHCN?',
        opts: ['Lần đầu xác định mô hình kinh tế tổng quát', 'Tiếp tục hoàn thiện mô hình kinh tế tổng quát', 'Từ bỏ mô hình KTTT', 'Đóng cửa nền kinh tế'],
        ans: 1
    },
    {
        q: 'Phân phối theo phúc lợi xã hội thể hiện điều gì?',
        opts: ['Tính chất tư bản', 'Định hướng XHCN của nền kinh tế', 'Sự tự do hoàn toàn', 'Tính chất bao cấp'],
        ans: 1
    },
    {
        q: 'Đâu là công cụ điều tiết của Nhà nước trong KTTT định hướng XHCN?',
        opts: ['Chỉ dùng kế hoạch tập trung', 'Pháp luật, chiến lược, quy hoạch, kế hoạch và các công cụ kinh tế', 'Chỉ dùng mệnh lệnh hành chính', 'Không điều tiết gì'],
        ans: 1
    },

    // === PHẦN II: HOÀN THIỆN THỂ CHẾ (câu 23-37) ===
    {
        q: 'Thể chế là gì?',
        opts: ['Chỉ là bộ máy nhà nước', 'Quy tắc, luật pháp, bộ máy quản lý và cơ chế vận hành', 'Chỉ là các quy định nội bộ', 'Chỉ là bộ luật hình sự'],
        ans: 1
    },
    {
        q: 'Thể chế kinh tế điều chỉnh những gì?',
        opts: ['Chỉ điều chỉnh hành vi cá nhân', 'Hành vi chủ thể KT, hành vi SXKD và các quan hệ kinh tế', 'Chỉ điều chỉnh quan hệ quốc tế', 'Chỉ điều chỉnh quan hệ chính trị'],
        ans: 1
    },
    {
        q: 'Thể chế KTTT định hướng XHCN là hệ thống gì?',
        opts: ['Hệ thống đường lối, luật pháp, chính sách hướng tới thị trường hiện đại', 'Hệ thống máy móc sản xuất', 'Hệ thống giáo dục', 'Hệ thống quân sự'],
        ans: 0
    },
    {
        q: 'Hoàn thiện thể chế KTTT định hướng XHCN gồm mấy nhóm nhiệm vụ chính?',
        opts: ['2', '3', '4', '5'],
        ans: 2
    },
    {
        q: 'Lý do nào KHÔNG thuộc sự cần thiết phải hoàn thiện thể chế?',
        opts: ['Thể chế chưa đồng bộ', 'Thể chế chưa đầy đủ', 'Thể chế đã hoàn thiện tuyệt đối', 'Hiệu lực thực thi chưa cao'],
        ans: 2
    },
    {
        q: 'Nhóm nhiệm vụ A trong hoàn thiện thể chế liên quan đến lĩnh vực nào?',
        opts: ['Phát triển thị trường vốn', 'Sở hữu và phát triển các thành phần kinh tế', 'Hội nhập quốc tế', 'Lãnh đạo của Đảng'],
        ans: 1
    },
    {
        q: 'Nhóm nhiệm vụ B tập trung vào vấn đề gì?',
        opts: ['An sinh xã hội', 'Phát triển đồng bộ các yếu tố thị trường và các loại thị trường', 'Tổ chức bộ máy nhà nước', 'Chính sách đối ngoại'],
        ans: 1
    },
    {
        q: 'Nhóm nhiệm vụ C đề cập đến điều gì?',
        opts: ['Xây dựng quân đội', 'Gắn kết tăng trưởng với công bằng xã hội và hội nhập quốc tế', 'Phát triển văn hóa', 'Cải cách giáo dục'],
        ans: 1
    },
    {
        q: 'Nhóm nhiệm vụ D nhấn mạnh vai trò của ai?',
        opts: ['Doanh nghiệp tư nhân', 'Người lao động', 'Đảng Cộng sản Việt Nam', 'Tổ chức quốc tế'],
        ans: 2
    },
    {
        q: 'Vai trò của Nhà nước trong thể chế KTTT định hướng XHCN là gì?',
        opts: ['Không can thiệp gì', 'Là tác giả của thể chế chính thức, xây dựng thể chế phục vụ nhân dân', 'Chỉ hỗ trợ doanh nghiệp lớn', 'Chỉ tập trung đối ngoại'],
        ans: 1
    },
    {
        q: 'Thể chế hóa quyền tài sản thuộc nhóm nhiệm vụ nào?',
        opts: ['Nhóm B', 'Nhóm C', 'Nhóm A', 'Nhóm D'],
        ans: 2
    },
    {
        q: 'Phát triển thị trường vốn, công nghệ, sức lao động thuộc nhóm nhiệm vụ nào?',
        opts: ['Nhóm A', 'Nhóm B', 'Nhóm C', 'Nhóm D'],
        ans: 1
    },
    {
        q: 'Rà soát pháp luật phù hợp cam kết quốc tế thuộc nhóm nhiệm vụ nào?',
        opts: ['Nhóm A', 'Nhóm B', 'Nhóm C', 'Nhóm D'],
        ans: 2
    },
    {
        q: 'Các yếu tố thị trường ở Việt Nam hiện nay đang ở trình độ nào?',
        opts: ['Phát triển cao', 'Hoàn thiện đầy đủ', 'Mới ở trình độ sơ khai', 'Đã bão hòa'],
        ans: 2
    },
    {
        q: 'Thể chế kinh tế khác thể chế chính trị ở điểm nào?',
        opts: ['Không khác nhau', 'Thể chế kinh tế điều chỉnh hành vi SXKD và quan hệ kinh tế', 'Thể chế chính trị không quan trọng', 'Thể chế kinh tế là một bộ phận của luật hình sự'],
        ans: 1
    },

    // === PHẦN III: QUAN HỆ LỢI ÍCH KINH TẾ (câu 38-50) ===
    {
        q: 'Lợi ích kinh tế được định nghĩa là gì?',
        opts: ['Lợi ích tinh thần từ hoạt động văn hóa', 'Lợi ích vật chất thu được khi thực hiện hoạt động kinh tế', 'Quyền lực chính trị của giai cấp thống trị', 'Tổng sản phẩm quốc dân'],
        ans: 1
    },
    {
        q: 'Bản chất của lợi ích kinh tế là gì?',
        opts: ['Thể hiện quyền lực nhà nước', 'Phản ánh mục đích và động cơ của các quan hệ giữa các chủ thể trong nền sản xuất xã hội', 'Thể hiện sự giàu có', 'Phản ánh trình độ văn hóa'],
        ans: 1
    },
    {
        q: 'Có bao nhiêu nhân tố ảnh hưởng đến quan hệ lợi ích kinh tế?',
        opts: ['2', '3', '4', '5'],
        ans: 2
    },
    {
        q: 'Nhân tố nào là quan trọng nhất ảnh hưởng đến quan hệ lợi ích kinh tế?',
        opts: ['Hội nhập quốc tế', 'Trình độ phát triển của LLSX', 'Chính sách của Nhà nước', 'Văn hóa truyền thống'],
        ans: 1
    },
    {
        q: 'Quan hệ nào là một trong 4 quan hệ lợi ích kinh tế cơ bản?',
        opts: ['NLĐ với người tiêu dùng', 'NLĐ với người SDLĐ', 'Người sản xuất với người vận chuyển', 'Người bán lẻ với người bán buôn'],
        ans: 1
    },
    {
        q: 'Trong quan hệ NLĐ - NSDLĐ, khi doanh nghiệp hiệu quả thì điều gì xảy ra?',
        opts: ['NLĐ bị sa thải', 'Tạo việc làm và thu nhập ổn định cho NLĐ', 'NLĐ bị giảm lương', 'Không có ảnh hưởng gì'],
        ans: 1
    },
    {
        q: 'Trong quan hệ giữa những NSDLĐ, mâu thuẫn chủ yếu là gì?',
        opts: ['Tranh chấp lao động', 'Cạnh tranh trong cùng ngành và giữa các ngành', 'Mâu thuẫn với nhà nước', 'Xung đột với công đoàn'],
        ans: 1
    },
    {
        q: 'Công cụ bảo vệ quyền lợi của NLĐ là gì?',
        opts: ['Nghiệp đoàn', 'Công đoàn', 'Tòa án', 'Quốc hội'],
        ans: 1
    },
    {
        q: '"Lợi ích nhóm" tiêu cực xuất hiện khi nào?',
        opts: ['Khi mọi người đoàn kết', 'Khi công chức, viên chức lạm dụng quyền lực nhà nước phục vụ lợi ích cá nhân', 'Khi doanh nghiệp hợp tác', 'Khi người dân khiếu nại'],
        ans: 1
    },
    {
        q: 'Vai trò "bảo vệ lợi ích hợp pháp" của Nhà nước KHÔNG bao gồm điều gì?',
        opts: ['Ổn định chính trị', 'Pháp luật thông thoáng', 'Trực tiếp điều hành mọi hoạt động SXKD', 'Tạo môi trường thuận lợi'],
        ans: 2
    },
    {
        q: 'Nhà nước điều hòa lợi ích thông qua công cụ nào?',
        opts: ['Mệnh lệnh hành chính', 'Chính sách phân phối thu nhập', 'Quân đội', 'Truyền thông'],
        ans: 1
    },
    {
        q: 'Hội nhập kinh tế quốc tế tác động đến lợi ích kinh tế như thế nào?',
        opts: ['Không tác động', 'Tác động mạnh và nhiều chiều đến lợi ích các chủ thể', 'Chỉ tác động đến doanh nghiệp FDI', 'Chỉ tác động đến nhà nước'],
        ans: 1
    },
    {
        q: 'Nguyên tắc giải quyết mâu thuẫn lợi ích kinh tế là gì?',
        opts: ['Bên mạnh quyết định', 'Có sự tham gia của các bên, đặt lợi ích đất nước lên trên hết', 'Nhà nước áp đặt', 'Để thị trường tự điều chỉnh'],
        ans: 1
    }
];

// ---- SHUFFLE & PICK 20 ----
function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function pickRandomQuestions(bank, count) {
    return shuffleArray(bank).slice(0, count);
}

// ---- MC MESSAGES ----
const mcCorrectMsgs = [
    "Chính xác! Bạn giỏi quá! 🎉",
    "Đúng rồi! Tiếp tục phát huy nhé! ⭐",
    "Xuất sắc! Kiến thức của bạn rất chắc! 👏",
    "Chuẩn không cần chỉnh! 💯",
    "Tuyệt vời! Bạn đang làm rất tốt! 🏆",
    "Đáp án hoàn toàn chính xác! 🌟",
    "Bạn nắm kiến thức cực kỳ tốt đấy! 🔥",
    "Rất đúng! Nào, câu tiếp theo! 💪",
    "Hoàn hảo! Không thể tốt hơn! ✨",
    "Bạn có muốn làm MC không đấy? Quá xuất sắc! 😄"
];

const mcWrongMsgs = [
    "Rất tiếc! Đáp án chưa chính xác rồi 😔",
    "Sai mất rồi! Nhưng đừng nản nhé! 💪",
    "Tiếc quá! Hãy suy nghĩ kỹ hơn ở câu sau 🤔",
    "Không sao cả! Sai một lần là kinh nghiệm đấy! 📖",
    "Oops! Câu này hơi khó nhỉ? Đọc lại giáo trình nhé! 📚",
    "Đừng lo! Cả MC như tôi còn sai nữa là! 😅",
    "A ha! Câu này bẫy đấy! Cố lên! 💪",
    "Chưa đúng! Nhưng bạn vẫn đang rất tập trung! 🎯",
    "Ôi không! Nhưng sai để học hỏi mà! 🌱",
    "Hơi tiếc một chút! Hãy bình tĩnh, bạn làm được! 🍀"
];

const mcMilestoneMsgs = {
    5: "Đã qua 5 câu! Bạn đang trên đường trở thành Triệu phú kiến thức! 💰",
    10: "Cột mốc 10 câu! Nửa chặng đường rồi, quá ấn tượng! 🔥",
    15: "Wow! 15 câu rồi! Bạn sắp chạm đến đỉnh cao! 🏔️",
    20: "20 câu hoàn thành! Bạn chính là Triệu Phú Kiến Thức Chương 5! 🏆👑"
};

const mcIntroMsg = 'Chào mừng đến với Quiz Chương 5! Hãy chọn đáp án đúng nhé! 🤓';

// ---- MONEY LADDER MILESTONES ----
const moneyLevels = [
    { q: 20, label: '20 — TRIỆU PHÚ KIẾN THỨC 🏆', cls: 'top' },
    { q: 19, label: '19 — 950.000', cls: '' },
    { q: 18, label: '18 — 900.000', cls: '' },
    { q: 17, label: '17 — 850.000', cls: '' },
    { q: 16, label: '16 — 800.000', cls: '' },
    { q: 15, label: '15 — CỘT MỐC QUAN TRỌNG ⭐', cls: 'safe' },
    { q: 14, label: '14 — 700.000', cls: '' },
    { q: 13, label: '13 — 650.000', cls: '' },
    { q: 12, label: '12 — 600.000', cls: '' },
    { q: 11, label: '11 — 550.000', cls: '' },
    { q: 10, label: '10 — CỘT MỐC AN TOÀN ⭐', cls: 'safe' },
    { q: 9,  label: '9  — 450.000', cls: '' },
    { q: 8,  label: '8  — 400.000', cls: '' },
    { q: 7,  label: '7  — 350.000', cls: '' },
    { q: 6,  label: '6  — 300.000', cls: '' },
    { q: 5,  label: '5  — MỐC ĐẦU TIÊN ⭐', cls: 'safe' },
    { q: 4,  label: '4  — 200.000', cls: '' },
    { q: 3,  label: '3  — 150.000', cls: '' },
    { q: 2,  label: '2  — 100.000', cls: '' },
    { q: 1,  label: '1  — 50.000', cls: '' }
];

// ---- QUIZ STATE ----
let quizData = [];
let qIdx = 0;
let qAnswers = [];
let qDone = false;
let currentScore = 0;

// ---- DOM REFS ----
const qEl = document.getElementById('quizQ');
const oEl = document.getElementById('quizO');
const prevEl = document.getElementById('quizPrevBtn');
const nextEl = document.getElementById('quizNextBtn');
const countEl = document.getElementById('quizCount');
const progEl = document.getElementById('quizProgressBar');
const resEl = document.getElementById('quizResult');
const mcIconEl = document.getElementById('mcIcon');
const mcFaceEl = document.getElementById('mcIconFace');
const mcBubbleEl = document.getElementById('mcIconBubble');
const moneyLadderEl = document.getElementById('moneyLadder');

// ---- MC EMOJI FACES ----
const mcFaces = {
    happy: '😎',
    sad: '😟',
    celebrate: '🥳',
    neutral: '🤓',
    thinking: '🤔'
};

// ---- BUILD MONEY LADDER ----
function buildMoneyLadder() {
    let html = '<div class="money-title">💰 Cột mốc</div>';
    moneyLevels.forEach(level => {
        html += `<div class="money-rung" data-q="${level.q}"><span>${level.label}</span></div>`;
    });
    moneyLadderEl.innerHTML = html;
}

function updateMoneyLadder() {
    const rungs = moneyLadderEl.querySelectorAll('.money-rung');
    rungs.forEach(rung => {
        const rungQ = parseInt(rung.getAttribute('data-q'));
        rung.classList.remove('active', 'passed');
        if (rungQ === qIdx + 1 && !qDone) {
            rung.classList.add('active');
        } else if (rungQ <= qIdx && qAnswers[rungQ - 1] !== null) {
            rung.classList.add('passed');
        }
    });
}

// ---- MC REACTIONS ----
function mcSpeak(msg, mood) {
    mcBubbleEl.querySelector('span').textContent = msg;
    mcIconEl.classList.remove('mc-happy', 'mc-sad', 'mc-neutral', 'mc-celebrate');
    mcFaceEl.textContent = mcFaces[mood] || mcFaces.neutral;
    switch (mood) {
        case 'happy':    mcIconEl.classList.add('mc-happy');    break;
        case 'sad':      mcIconEl.classList.add('mc-sad');      break;
        case 'celebrate':mcIconEl.classList.add('mc-celebrate');break;
        default:         mcIconEl.classList.add('mc-neutral');  break;
    }
}

function getRandomMsg(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ---- RENDER QUIZ ----
function renderQuiz() {
    const q = quizData[qIdx];
    const answered = qAnswers[qIdx] !== null;
    qEl.textContent = `Câu ${qIdx + 1}: ${q.q}`;
    oEl.innerHTML = '';

    q.opts.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
        if (qAnswers[qIdx] === i) {
            btn.classList.add('selected');
            if (qDone) btn.classList.add(i === q.ans ? 'correct' : 'incorrect');
        }
        if (qDone && i === q.ans && qAnswers[qIdx] !== i) btn.classList.add('correct');
        if (answered || qDone) btn.disabled = true;
        btn.addEventListener('click', () => {
            if (qDone || qAnswers[qIdx] !== null) return;
            qAnswers[qIdx] = i;
            if (i === q.ans) {
                mcSpeak(getRandomMsg(mcCorrectMsgs), 'happy');
            } else {
                mcSpeak(getRandomMsg(mcWrongMsgs), 'sad');
            }
            renderQuiz();
        });
        oEl.appendChild(btn);
    });

    prevEl.disabled = qIdx === 0;
    nextEl.textContent = qIdx === quizData.length - 1 ? 'Nộp bài ✓' : 'Sau →';
    countEl.textContent = `${qIdx + 1} / ${quizData.length}`;
    progEl.style.width = `${((qIdx + 1) / quizData.length) * 100}%`;
    updateMoneyLadder();

    // Update MC icon for unanswered question
    if (!answered && !qDone) {
        mcSpeak('Chọn đáp án đúng nhé!', 'thinking');
    }
}

// ---- NAVIGATION ----
prevEl.addEventListener('click', () => {
    if (qIdx > 0) { qIdx--; renderQuiz(); }
});

nextEl.addEventListener('click', () => {
    if (qIdx === quizData.length - 1 && !qDone) {
        submitQuiz();
        return;
    }
    if (qIdx < quizData.length - 1) {
        qIdx++;
        renderQuiz();
        if (mcMilestoneMsgs[qIdx + 1]) {
            mcSpeak(mcMilestoneMsgs[qIdx + 1], 'celebrate');
        }
    }
});

// ---- SUBMIT ----
function submitQuiz() {
    qDone = true;
    currentScore = qAnswers.reduce((s, a, i) => s + (a === quizData[i].ans ? 1 : 0), 0);
    renderQuiz();

    // MC final reaction
    if (currentScore === 20) {
        mcSpeak('HOÀN HẢO! 20/20! Bạn chính là TRIỆU PHÚ KIẾN THỨC! 🏆👑🎉', 'celebrate');
    } else if (currentScore >= 15) {
        mcSpeak(`Xuất sắc! ${currentScore}/20 — Bạn suýt thành triệu phú rồi! 🎉`, 'happy');
    } else if (currentScore >= 10) {
        mcSpeak(`Khá tốt! ${currentScore}/20 — Nửa đường đến danh hiệu triệu phú! 👍`, 'happy');
    } else if (currentScore >= 5) {
        mcSpeak(`${currentScore}/20 — Cần cố gắng thêm chút nữa nhé! Tôi tin bạn làm được! 💪`, 'sad');
    } else {
        mcSpeak(`${currentScore}/20 — Đừng nản! Ôn lại giáo trình và thử lại nhé! 📖`, 'sad');
    }

    resEl.style.display = 'block';
    let msg, emoji;
    if (currentScore === 20) { msg = '🏆 Xuất sắc! Bạn là Triệu Phú Kiến Thức!'; emoji = '👑'; }
    else if (currentScore >= 15) { msg = '🌟 Rất giỏi! Bạn suýt chạm đỉnh!'; emoji = '🎉'; }
    else if (currentScore >= 10) { msg = '👍 Khá! Nửa đường đến danh hiệu.'; emoji = '📚'; }
    else if (currentScore >= 5) { msg = '📖 Cần cố gắng thêm!'; emoji = '💪'; }
    else { msg = '💪 Hãy đọc lại Chương 5 nhé.'; emoji = '📖'; }

    resEl.innerHTML = `
        <h3>Kết quả ${emoji}</h3>
        <div class="score-big">${currentScore} / ${quizData.length}</div>
        <p class="score-msg">${msg}</p>
        <button class="quiz-retry" onclick="restartQuiz()">Làm lại ↻</button>
    `;

    // Scroll to result
    resEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ---- RESTART ----
function restartQuiz() {
    quizData = pickRandomQuestions(questionBank, 20);
    qDone = false;
    qIdx = 0;
    qAnswers = Array(quizData.length).fill(null);
    currentScore = 0;
    resEl.style.display = 'none';
    mcSpeak(mcIntroMsg, 'neutral');
    renderQuiz();
    window.scrollTo({ top: document.getElementById('quiz-sec').offsetTop - 70, behavior: 'smooth' });
}

// ---- INIT ----
buildMoneyLadder();
restartQuiz();

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
    'kttt định hướng xhcn|khái niệm|định nghĩa|kttt là gì|kinh tế thị trường định hướng': 'Kinh tế thị trường định hướng XHCN là <b>nền kinh tế vận hành theo các quy luật của thị trường</b>, đồng thời góp phần hướng tới từng bước xác lập một xã hội <b>"dân giàu, nước mạnh, dân chủ, công bằng, văn minh"</b>; có sự điều tiết của Nhà nước do Đảng Cộng sản Việt Nam lãnh đạo.<br><br>Đây là <b>mô hình kinh tế tổng quát</b> của Việt Nam trong thời kỳ quá độ lên CNXH, được khẳng định từ Đại hội IX (2001).',

    'tính tất yếu|tại sao|vì sao|vì sao phải|lý do|tất yếu khách quan': 'Có <b>3 lý do</b> phát triển KTTT định hướng XHCN tại Việt Nam:<br><br><b>1. Xu hướng phát triển khách quan:</b> Phù hợp với bối cảnh thế giới. Không có mô hình KTTT chung cho mọi quốc gia. Mỗi nước có đặc thù riêng.<br><br><b>2. Tính ưu việt của KTTT:</b> Là phương thức phân bổ nguồn lực hiệu quả nhất, thúc đẩy LLSX, kích thích tiến bộ kỹ thuật - công nghệ, nâng cao năng suất lao động.<br><br><b>3. Nguyện vọng của nhân dân:</b> Phù hợp khát vọng dân giàu, nước mạnh, dân chủ, công bằng, văn minh.',

    '5 đặc trưng|đặc trưng|đặc trưng cơ bản|năm đặc trưng': '5 đặc trưng cơ bản của KTTT định hướng XHCN:<br><br><b>1. Về mục tiêu:</b> Phát triển LLSX, xây dựng CSVC-KT của CNXH, thực hiện "dân giàu, nước mạnh, dân chủ, công bằng, văn minh".<br><br><b>2. Về sở hữu & thành phần KT:</b> Nhiều hình thức sở hữu, nhiều thành phần. Kinh tế nhà nước giữ vai trò chủ đạo, kinh tế tư nhân là động lực quan trọng.<br><br><b>3. Về quan hệ quản lý:</b> Nhà nước pháp quyền XHCN do Đảng lãnh đạo, chịu sự giám sát của nhân dân.<br><br><b>4. Về quan hệ phân phối:</b> Phân phối theo lao động & hiệu quả kinh tế, theo mức đóng góp vốn + an sinh xã hội.<br><br><b>5. Về gắn tăng trưởng với công bằng:</b> Thực hiện tiến bộ & công bằng ngay trong từng chính sách, từng giai đoạn.',

    'đại hội|nhận thức của đảng|lịch sử|quá trình|timeline': 'Quá trình nhận thức của Đảng về KTTT định hướng XHCN:<br><br><b>1986 - ĐH VI:</b> Bắt đầu đổi mới, vận dụng mặt tích cực của kinh tế hàng hóa.<br><br><b>2001 - ĐH IX:</b> Khẳng định KTTT định hướng XHCN là <b>mô hình kinh tế tổng quát</b>.<br><br><b>2011 - ĐH XI:</b> Nhiều thành phần, vận hành theo cơ chế thị trường, Nhà nước quản lý.<br><br><b>2016 - ĐH XII:</b> Vận hành đầy đủ, đồng bộ, hiện đại & hội nhập quốc tế.<br><br><b>2021 - ĐH XIII:</b> Tiếp tục hoàn thiện mô hình.',

    'thể chế|hoàn thiện thể chế|thể chế kinh tế|thể chế kttt': '<b>Thể chế:</b> Quy tắc, luật pháp, bộ máy quản lý & cơ chế vận hành.<br><br><b>Thể chế kinh tế:</b> Điều chỉnh hành vi chủ thể KT và các quan hệ kinh tế.<br><br><b>Thể chế KTTT định hướng XHCN:</b> Hệ thống đường lối, luật pháp, chính sách hướng tới thị trường hiện đại.<br><br><b>3 lý do phải hoàn thiện:</b> (1) Chưa đồng bộ, (2) Chưa đầy đủ, (3) Hiệu lực kém.<br><br><b>4 nhóm nhiệm vụ:</b> A - Sở hữu & thành phần KT; B - Phát triển yếu tố & loại thị trường; C - Gắn kết tăng trưởng với bền vững & hội nhập; D - Nâng cao năng lực lãnh đạo của Đảng.',

    'lợi ích kinh tế|lợi ích|lợi ích là gì': '<b>Lợi ích kinh tế</b> là lợi ích vật chất thu được khi thực hiện các hoạt động kinh tế của con người.<br><br><b>Bản chất:</b> Phản ánh mục đích và động cơ của các quan hệ giữa các chủ thể trong nền sản xuất xã hội.<br><br><b>Hai vai trò chính:</b><br>1. Là <b>động lực trực tiếp</b> của các chủ thể và hoạt động kinh tế - xã hội.<br>2. Là <b>cơ sở thúc đẩy</b> sự phát triển các lợi ích khác (chính trị, xã hội, văn hóa).',

    'nhân tố ảnh hưởng|những nhân tố|yếu tố ảnh hưởng': '4 nhân tố ảnh hưởng đến quan hệ lợi ích kinh tế:<br><br><b>1. Trình độ phát triển của LLSX</b> - LLSX càng cao, đáp ứng lợi ích càng tốt.<br><b>2. Địa vị trong hệ thống QHSX</b> - Quan hệ sở hữu quyết định vị trí, vai trò.<br><b>3. Chính sách phân phối thu nhập của Nhà nước</b> - Làm thay đổi mức và tương quan thu nhập.<br><b>4. Hội nhập kinh tế quốc tế</b> - Tác động mạnh và nhiều chiều đến lợi ích các chủ thể.',

    '4 quan hệ|bốn quan hệ|quan hệ lợi ích|quan hệ cơ bản': '4 quan hệ lợi ích kinh tế cơ bản:<br><br><b>1. Người LĐ ↔ Người SDLĐ:</b> Thống nhất về việc làm - thu nhập; mâu thuẫn về phân chia lợi nhuận - tiền lương. Công cụ: Công đoàn, nghiệp đoàn.<br><br><b>2. Người SDLĐ ↔ Người SDLĐ:</b> Vừa là đối tác vừa là đối thủ. Cạnh tranh quyết liệt, liên kết thành đội ngũ doanh nhân.<br><br><b>3. Người LĐ ↔ Người LĐ:</b> Cạnh tranh khi bán sức lao động; đoàn kết để bảo vệ quyền lợi.<br><br><b>4. Cá nhân → Nhóm → Xã hội:</b> Cá nhân là nền tảng. "Lợi ích nhóm" tiêu cực cần ngăn chặn.',

    'vai trò nhà nước|nhà nước|nhà nước làm gì|vai trò của nhà nước': 'Nhà nước có <b>4 vai trò</b> trong bảo đảm hài hòa quan hệ lợi ích:<br><br><b>1. Bảo vệ lợi ích hợp pháp:</b> Tạo môi trường thuận lợi - ổn định chính trị, pháp luật thông thoáng, kết cấu hạ tầng.<br><br><b>2. Điều hòa lợi ích:</b> Chính sách phân phối thu nhập giữa cá nhân - doanh nghiệp - xã hội; phát triển LLSX & khoa học công nghệ.<br><br><b>3. Kiểm soát, ngăn ngừa tiêu cực:</b> Chống tham nhũng, "lợi ích nhóm", thu nhập bất hợp pháp.<br><br><b>4. Giải quyết mâu thuẫn:</b> Phát hiện kịp thời, hòa giải; đặt lợi ích đất nước lên trên hết.',

    'sở hữu|thành phần kinh tế|kinh tế nhà nước|kinh tế tư nhân': 'KTTT định hướng XHCN có <b>nhiều hình thức sở hữu, nhiều thành phần kinh tế</b>.<br><br><b>Kinh tế nhà nước</b> giữ vai trò <b>chủ đạo</b>, cùng kinh tế tập thể trở thành nền tảng vững chắc.<br><br><b>Kinh tế tư nhân</b> là <b>động lực quan trọng</b>.<br><br>Các chủ thể thuộc mọi thành phần kinh tế <b>bình đẳng, hợp tác, cạnh tranh</b> theo pháp luật.',

    'phân phối|quan hệ phân phối|phân phối công bằng': 'Quan hệ phân phối trong KTTT định hướng XHCN:<br><br>- Phân phối <b>công bằng</b> các yếu tố sản xuất (đầu vào)<br>- Phân phối kết quả (đầu ra) chủ yếu theo <b>kết quả lao động, hiệu quả kinh tế, mức đóng góp vốn</b><br>- Kết hợp với <b>an sinh xã hội, phúc lợi xã hội</b><br><br>Các hình thức phân phối phản ánh định hướng XHCN: phân phối theo lao động & hiệu quả kinh tế, phân phối theo phúc lợi.',

    'tăng trưởng|công bằng|tăng trưởng và công bằng|công bằng xã hội': 'Đặc trưng quan trọng: <b>gắn tăng trưởng kinh tế với công bằng xã hội</b>.<br><br>- Thực hiện tiến bộ & công bằng <b>ngay trong từng chính sách, từng giai đoạn</b><br>- Không chờ kinh tế phát triển cao mới làm<br>- Không "hy sinh" công bằng để chạy theo tăng trưởng<br>- Đầu tư cho xã hội (giáo dục, y tế, văn hóa) là đầu tư cho phát triển bền vững',

    'thị trường|kế hoạch|kế hoạch hóa|cơ chế thị trường': 'KTTT định hướng XHCN vận hành theo <b>các quy luật của thị trường</b> (giá cả, cạnh tranh, cung cầu), đồng thời có <b>sự điều tiết của Nhà nước</b> thông qua pháp luật, chiến lược, quy hoạch, kế hoạch và các công cụ kinh tế.<br><br>Sự can thiệp của Nhà nước nhằm khắc phục khuyết tật của thị trường, đảm bảo tính bền vững và định hướng XHCN.',

    'lợi ích nhóm|nhóm lợi ích|tiêu cực|tham nhũng': '"Lợi ích nhóm" và "nhóm lợi ích" tiêu cực là khi có sự tham gia của công chức, viên chức hoặc cơ quan công quyền lạm dụng quyền lực nhà nước phục vụ cho lợi ích cá nhân.<br><br>Đảng và Nhà nước chủ trương <b>chống quyết liệt, thường xuyên</b> các biểu hiện tiêu cực này. Cần công khai, minh bạch, xóa bỏ cơ chế "xin - cho", "duyệt - cấp".',

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

console.log('✅ Chương 5 - Ai Là Triệu Phú đã sẵn sàng!');