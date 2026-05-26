        /* --- 1. HIỆU ỨNG HOA ANH ĐÀO RƠI --- */
        function createSakura() {
            const body = document.querySelector('body');
            const sakura = document.createElement('div');
            sakura.classList.add('sakura');
            
            // Kích thước ngẫu nhiên
            const size = Math.random() * 10 + 5; 
            sakura.style.width = size + 'px';
            sakura.style.height = size + 'px';
            
            // Vị trí xuất hiện ngẫu nhiên theo chiều ngang
            sakura.style.left = Math.random() * 100 + 'vw';
            
            // Thời gian rơi và lắc lư ngẫu nhiên
            const fallDuration = Math.random() * 3 + 4; // 4s - 7s
            const swayDuration = Math.random() * 2 + 1; // 1s - 3s
            sakura.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
            
            body.appendChild(sakura);
            
            // Xóa element sau khi rơi xong để không làm nặng web
            setTimeout(() => {
                sakura.remove();
            }, fallDuration * 1000);
        }
        setInterval(createSakura, 300); // Mật độ tạo hoa

        /* --- 2. DROPDOWN MENU --- */
        const dropdownTrigger = document.getElementById('dropdownTrigger');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const dropdownIcon = document.getElementById('dropdownIcon');

        dropdownTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            dropdownIcon.innerText = dropdownMenu.classList.contains('show') ? '⌃' : '⌄';
        });

        document.addEventListener('click', (e) => {
            if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                dropdownIcon.innerText = '⌄';
            }
        });

        /* --- 3. CHUYỂN TAB ANIMATION --- */
        const tabLinks = document.querySelectorAll('.tab-link');
        const tabSections = document.querySelectorAll('.tab-section');

        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                
                // Cập nhật class active cho menu link
                document.querySelectorAll('.dropdown-item.tab-link').forEach(item => item.classList.remove('active-link'));
                if(link.classList.contains('dropdown-item')) link.classList.add('active-link');
                
                // Đóng dropdown nếu click từ menu
                dropdownMenu.classList.remove('show');
                dropdownIcon.innerText = '⌄';

                // Ẩn tất cả section và hiện section được chọn (kèm animation css)
                tabSections.forEach(section => {
                    section.classList.remove('active');
                });
                const targetSection = document.getElementById(targetId);
                targetSection.classList.add('active');

                // Scroll mượt lên đầu
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });

        /* --- 4. ACCORDION FAQ --- */
        document.querySelectorAll('.faq-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.parentElement;
                document.querySelectorAll('.faq-item').forEach(item => {
                    if(item !== parent) item.classList.remove('active');
                });
                parent.classList.toggle('active');
            });
        });

        /* --- 5. TRÌNH PHÁT NHẠC (MUSIC PLAYER) --- */
        const playlist = [
            { name: "Ai Ngoài Anh", src: "track1.mp3" },
            { name: "Ngày Rời Chuyến Bay", src: "track2.mp3" },
            { name: "In Love", src: "track3.mp3" }
        ];

        let currentTrackIdx = 0;
        const audio = new Audio(playlist[currentTrackIdx].src);
        audio.loop = true; // Lặp lại bài nếu hết
        
        const musicToggleBtn = document.getElementById('musicToggleBtn');
        const musicPanel = document.getElementById('musicPanel');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const prevTrackBtn = document.getElementById('prevTrack');
        const nextTrackBtn = document.getElementById('nextTrack');
        const trackNameEl = document.getElementById('trackName');
        const volumeSlider = document.getElementById('volumeSlider');
        let isPlaying = false;

        // Bật/tắt panel
        musicToggleBtn.addEventListener('click', () => {
            musicPanel.classList.toggle('show');
        });

        // Hàm cập nhật UI khi đổi bài
        function loadTrack(idx) {
            currentTrackIdx = idx;
            audio.src = playlist[currentTrackIdx].src;
            trackNameEl.innerText = playlist[currentTrackIdx].name;
            if (isPlaying) {
                audio.play();
            }
        }

        // Chơi / Dừng
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                playPauseBtn.innerText = '▶';
                musicToggleBtn.classList.remove('is-playing');
            } else {
                audio.play();
                playPauseBtn.innerText = '⏸';
                musicToggleBtn.classList.add('is-playing');
            }
            isPlaying = !isPlaying;
        });

        // Bài tiếp theo
        nextTrackBtn.addEventListener('click', () => {
            let nextIdx = (currentTrackIdx + 1) % playlist.length;
            loadTrack(nextIdx);
        });

        // Bài trước
        prevTrackBtn.addEventListener('click', () => {
            let prevIdx = (currentTrackIdx - 1 + playlist.length) % playlist.length;
            loadTrack(prevIdx);
        });

        // Điều chỉnh âm lượng
        audio.volume = volumeSlider.value;
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value;
        });

        // Form Submit Demo
        document.getElementById('webhookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form đã được gửi đi! 💌');
        });