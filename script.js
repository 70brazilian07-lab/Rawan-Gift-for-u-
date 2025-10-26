document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const heartSymbols = ['💞', '❤️', '🤍', '💖', '✨', '⭐', '💫', '🌠', '🌌'];
    const numHearts = 70;
    const warmthButton = document.getElementById('warmth-button');
    
    const secretMessageDiv = document.getElementById('secret-message');
    const secretMessageP = secretMessageDiv ? secretMessageDiv.querySelector('p') : null;
    
    // قائمة الرسائل الجديدة التي ستظهر بالترتيب
    const SECRET_MESSAGES_SEQUENCE = [
        "You look beautiful at all times.",
        "Your eyes are like the bright moon",
        "You are the best person I have ever known in my life",
        "I hope you are happy now",
        "I wish you a better life"
    ];


    // ----------------- وظيفة القلوب الطائرة -----------------
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart', 'floating-heart');
        
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.textContent = symbol;
        
        const left = Math.random() * 100; 
        const initialTop = 100 + Math.random() * 10; 

        heart.style.left = `${left}vw`; 
        heart.style.top = `${initialTop}vh`;
        heart.style.animationDuration = `${Math.random() * 8 + 10}s`; 
        heart.style.animationDelay = `-${Math.random() * 10}s`; 

        heart.addEventListener('click', (event) => {
            heart.classList.add('popped');
            setTimeout(() => {
                heart.remove();
                heartContainer.appendChild(createHeart()); 
            }, 500); 
            event.stopPropagation(); 
        });

        return heart;
    }

    if (heartContainer) {
        for (let i = 0; i < numHearts; i++) {
            heartContainer.appendChild(createHeart());
        }
    }

    // ----------------- وظيفة عرض الرسائل بالترتيب -----------------
    function displayMessagesSequentially(messages, totalDuration = 6000) {
        if (!messages || messages.length === 0) return;

        const totalMessages = messages.length;
        // يتم تقسيم الـ 6 ثواني (6000ms) على عدد الرسائل.
        const displayDuration = totalDuration / totalMessages; 
        let currentIndex = 0;

        // دالة لعرض الرسالة
        const showNextMessage = () => {
            if (currentIndex < totalMessages) {
                // 1. عرض الرسالة الجديدة
                secretMessageP.textContent = messages[currentIndex];
                secretMessageDiv.classList.add('show');
                
                // 2. إعداد التأخير لاختفاء الرسالة
                setTimeout(() => {
                    secretMessageDiv.classList.remove('show'); // الاختفاء الآن سلس بفضل CSS Transition (0.5s)
                    currentIndex++;
                    
                    // 3. إعداد التأخير لظهور الرسالة التالية
                    // 500ms للسماح بانتقال الاختفاء السلس قبل ظهور الرسالة التالية
                    setTimeout(showNextMessage, 500); 
                }, displayDuration - 500); // المدة التي تظهر فيها الرسالة
                
            } else {
                // 4. بعد انتهاء عرض جميع الرسائل، إعادة ضبط الزر
                setTimeout(() => {
                    warmthButton.classList.remove('active-cooldown');
                    warmthButton.innerHTML = '<i class="fas fa-magic"></i> View Hidden Message';
                }, 500); 
            }
        };
        
        showNextMessage();
    }


    // ----------------- وظيفة الزر: بدء العرض المتسلسل -----------------
    if (warmthButton && secretMessageDiv && secretMessageP) {
        warmthButton.addEventListener('click', () => {
            if (warmthButton.classList.contains('active-cooldown')) {
                return;
            }

            warmthButton.classList.add('active-cooldown');
            warmthButton.innerHTML = '<i class="fas fa-magic"></i> Displaying...';
            
            // بدء عرض الرسائل المتسلسل (إجمالي 6 ثوانٍ للعرض)
            displayMessagesSequentially(SECRET_MESSAGES_SEQUENCE, 6000); 
        });
    }
});


// ----------------- وظيفة النجوم لخلفية صفحة الرسالة (حركة الظهور والاختفاء) -----------------
window.addEventListener('load', () => {
    const starContainer = document.getElementById('star-background-container');
    if (!starContainer) return;

    const numStars = 100;
    const starSymbols = ['•', '°', '.', '⭐', '✨']; 

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('message-star');
        
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.fontSize = `${Math.random() * 0.7 + 0.4}em`; 
        star.style.animationDelay = `-${Math.random() * 6}s`; 
        
        const duration = Math.random() * 15 + 10; 
        star.style.setProperty('--duration', `${duration}s`);

        setTimeout(() => {
            star.remove();
            starContainer.appendChild(createStar()); 
        }, duration * 1000);

        return star;
    }

    for (let i = 0; i < numStars; i++) {
        starContainer.appendChild(createStar());
    }
});