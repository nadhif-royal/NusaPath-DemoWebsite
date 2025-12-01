/* FILE: js/main.js 
   Pastikan file ini berada di dalam folder "js"
*/

// --- 1. FEATURE SWITCHER (Global Function) ---
window.switchFeature = function(element, featureId) {
    const allItems = document.querySelectorAll('.feature-item');
    allItems.forEach(item => {
        item.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
};

// --- LOGIKA UTAMA SAAT WEBSITE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("NusaPath JS Loaded Successfully!");

    // --- 2. STICKY HEADER ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // --- 3. MOBILE MENU ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    }

    // --- 4. MOCKUP SLIDESHOW (Carousel) ---
    const sliderImg = document.getElementById('mockup-slider');
    
    // Pastikan path ini BENAR (assets/NamaFile.png)
    const frames = [
        'assets/FrameSplashScreen.png', 
        'assets/FrameDashboard.png', 
        'assets/FrameNusaTrip.png', 
        'assets/FrameTravelMate.png'
    ];

    let currentFrameIndex = 0;

    if(sliderImg) {
        setInterval(() => {
            sliderImg.classList.add('fade-out');
            setTimeout(() => {
                currentFrameIndex = (currentFrameIndex + 1) % frames.length;
                sliderImg.src = frames[currentFrameIndex];
                sliderImg.onload = () => {
                    sliderImg.classList.remove('fade-out');
                };
                setTimeout(() => sliderImg.classList.remove('fade-out'), 100);
            }, 500); 
        }, 3500); 
    }

    // --- 5. ITINERARY GENERATOR ---
    const demoForm = document.getElementById('itinerary-form');
    const resultDiv = document.getElementById('demo-result');
    const timelineContainer = document.getElementById('timeline-container');
    
    if (demoForm) {
        const submitBtn = demoForm.querySelector('button');

        demoForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const loc = document.getElementById('location').value;
            const days = parseInt(document.getElementById('days').value);
            const budget = document.getElementById('budget').value;

            // Loading State
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Generating...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Update Judul
                document.getElementById('res-loc').innerText = loc;
                document.getElementById('res-days').innerText = days + " Days";
                document.getElementById('res-budget').innerText = budget;

                // Generate HTML Timeline
                let htmlContent = generateTimelineHTML(loc, days);

                // Tampilkan Hasil
                timelineContainer.innerHTML = htmlContent;
                resultDiv.classList.remove('hidden');
                
                // Kembalikan Tombol
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll ke hasil
                resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            }, 1000);
        });
    }
});

// --- HELPER FUNCTION: DATA ITINERARY (BAHASA SUDAH DIPERBAIKI) ---
function generateTimelineHTML(location, days) {
    const db = {
        'Bali': [
            // Day 1
            [
                {t:"09:00", a:"Arrival at Ngurah Rai Int'l Airport"}, 
                {t:"12:00", a:"Check-in at Hotel & Refresh"}, 
                {t:"16:00", a:"Golden Hour Sunset at Tanah Lot Temple"}, 
                {t:"19:00", a:"Seafood Candlelight Dinner at Jimbaran Bay"}
            ],
            // Day 2
            [
                {t:"08:00", a:"Cultural Morning: Barong Dance Performance"}, 
                {t:"12:00", a:"Lunch with Mount Batur Volcano View (Kintamani)"}, 
                {t:"15:00", a:"Coffee Plantation & Luwak Coffee Tasting"},
                {t:"17:00", a:"Tegalalang Rice Terrace Trekking"}
            ],
            // Day 3
            [
                {t:"07:00", a:"Fast Boat to Nusa Penida Island"}, 
                {t:"10:00", a:"Visit Kelingking Beach (T-Rex Cliff)"}, 
                {t:"13:00", a:"Snorkeling at Crystal Bay"}, 
                {t:"17:00", a:"Return Boat to Sanur Harbor"}
            ],
            // Day 4
            [
                {t:"09:00", a:"Visit Ulun Danu Beratan Temple"}, 
                {t:"11:00", a:"Photo Session at Handara Gate"}, 
                {t:"13:00", a:"Buffet Lunch at Bedugul"}, 
                {t:"16:00", a:"Walk through Jatiluwih Rice Terrace (UNESCO Site)"}
            ],
            // Day 5
            [
                {t:"10:00", a:"Morning Spa & Wellness Session"}, 
                {t:"13:00", a:"Lunch at Trendy Canggu Cafe"}, 
                {t:"16:00", a:"Sunset at Uluwatu Temple"}, 
                {t:"18:00", a:"Watch Kecak Fire Dance Performance"}
            ],
            // Day 6
            [
                {t:"09:00", a:"Water Sports at Tanjung Benoa"}, 
                {t:"13:00", a:"Visit GWK Cultural Park"}, 
                {t:"17:00", a:"Relax at Melasti Beach Beach Club"}
            ],
            // Day 7
            [
                {t:"09:00", a:"Souvenir Shopping at Krisna Oleh-Oleh"}, 
                {t:"11:00", a:"Final Coffee Break"}, 
                {t:"13:00", a:"Transfer to Airport for Departure"}
            ]
        ],
        'Yogyakarta': [
            // Day 1
            [
                {t:"09:00", a:"Arrival at YIA Airport & Hotel Transfer"}, 
                {t:"13:00", a:"Lunch: Authentic Gudeg Yu Djum"}, 
                {t:"16:00", a:"Evening Stroll at Malioboro Street"}, 
                {t:"19:00", a:"Charcoal Coffee Experience (Kopi Joss)"}
            ],
            // Day 2
            [
                {t:"04:00", a:"Magical Sunrise at Punthuk Setumbu"}, 
                {t:"07:00", a:"Explore Borobudur Temple (World Heritage)"}, 
                {t:"12:00", a:"Lunch at Jejamuran Resto"}, 
                {t:"14:00", a:"Jeep Adventure: Merapi Volcano Lava Tour"}
            ],
            // Day 3
            [
                {t:"08:00", a:"Visit The Sultan's Palace (Kraton)"}, 
                {t:"10:00", a:"Explore Tamansari Water Castle"}, 
                {t:"13:00", a:"Lunch: Sate Klathak Pak Pong"}, 
                {t:"16:00", a:"Sunset at Prambanan Temple Complex"}, 
                {t:"19:00", a:"Watch Ramayana Ballet Performance"}
            ],
            // Day 4
            [
                {t:"09:00", a:"Cave Tubing Adventure at Goa Pindul"}, 
                {t:"12:00", a:"Lunch at Local Resto"}, 
                {t:"14:00", a:"Relax at Indrayanti Beach"}, 
                {t:"18:00", a:"Dinner with City View at Bukit Bintang"}
            ],
            // Day 5
            [
                {t:"08:00", a:"Visit Mangunan Pine Forest"}, 
                {t:"10:00", a:"Photo Spot at Jurang Tembelan"}, 
                {t:"13:00", a:"Explore Gumuk Pasir (Sand Dunes)"}, 
                {t:"17:00", a:"ATV Ride at Parangtritis Beach"}
            ],
            // Day 6
            [
                {t:"09:00", a:"Ullen Sentalu Museum Tour"}, 
                {t:"12:00", a:"Lunch at The House of Raminten"}, 
                {t:"15:00", a:"Silver Craft Workshop at Kotagede"}
            ],
            // Day 7
            [
                {t:"09:00", a:"Souvenir Shopping (Bakpia & Batik)"}, 
                {t:"11:00", a:"Check-out Hotel"}, 
                {t:"13:00", a:"Transfer to Airport/Train Station"}
            ]
        ],
        'Malang': [
            // Day 1
            [
                {t:"09:00", a:"Arrival at Malang Station/Airport"}, 
                {t:"12:00", a:"Lunch: Legendary Bakso President"}, 
                {t:"14:00", a:"Heritage Walk at Kayutangan Street"}, 
                {t:"16:00", a:"Photo Session at Jodipan Colorful Village"}, 
                {t:"19:00", a:"Colonial Style Dinner at Toko Oen"}
            ],
            // Day 2
            [
                {t:"00:30", a:"Midnight Jeep Journey to Mount Bromo"}, 
                {t:"04:00", a:"Golden Sunrise at Penanjakan Viewpoint"}, 
                {t:"06:00", a:"Bromo Crater Hike & Sea of Sand"}, 
                {t:"08:00", a:"Savana & Teletubbies Hill Photo Spot"}, 
                {t:"13:00", a:"Return to Hotel & Rest"}
            ],
            // Day 3
            [
                {t:"09:00", a:"Check-out & Transfer to Batu City"}, 
                {t:"10:30", a:"Explore Jatim Park 3 (Dino Park)"}, 
                {t:"13:00", a:"Lunch: Pecel Kawi"}, 
                {t:"15:00", a:"Visit Museum Angkut (Transportation Museum)"}, 
                {t:"19:00", a:"Street Food & Ferris Wheel at Batu Square"}
            ],
            // Day 4
            [
                {t:"08:00", a:"Nature Walk at Coban Rondo Waterfall"}, 
                {t:"11:00", a:"Paragliding Hill & Sky House (Omah Kayu)"}, 
                {t:"13:00", a:"Lunch: Sate Kelinci (Rabbit Satay)"}, 
                {t:"15:00", a:"Fresh Apple Picking at Agrotourism Farm"}, 
                {t:"19:00", a:"Fun Night at Batu Night Spectacular (BNS)"}
            ],
            // Day 5
            [
                {t:"07:00", a:"Adventure Trekking to Tumpak Sewu Waterfall"}, 
                {t:"12:00", a:"Local Lunch near Waterfall"}, 
                {t:"16:00", a:"Return Journey to Malang City"}, 
                {t:"19:00", a:"Dinner at Mie Gacoan / Local Cuisine"}
            ],
            // Day 6
            [
                {t:"08:00", a:"Beach Hopping: Goa Cina & Tiga Warna"}, 
                {t:"13:00", a:"Fresh Seafood Lunch by the Beach"}, 
                {t:"16:00", a:"Relaxing Sunset by the Ocean"}, 
                {t:"20:00", a:"Back to City"}
            ],
            // Day 7
            [
                {t:"09:00", a:"Souvenir Shopping (Strudel & Chips)"}, 
                {t:"11:00", a:"Visit Flora San Terra (Optional)"}, 
                {t:"13:00", a:"Transfer to Airport/Station for Departure"}
            ]
        ],
        'Labuan Bajo': [
            // Day 1
            [
                {t:"10:00", a:"Arrival at Komodo Airport & Check-in"}, 
                {t:"13:00", a:"Lunch with Ocean View"}, 
                {t:"15:00", a:"Explore Batu Cermin Mirror Cave"}, 
                {t:"17:30", a:"Sunset View at Sylvia Hill"}, 
                {t:"19:00", a:"Seafood Dinner at Kampung Ujung Night Market"}
            ],
            // Day 2
            [
                {t:"06:00", a:"Start Full Day Speedboat Tour"}, 
                {t:"07:30", a:"Hiking Padar Island for Iconic View"}, 
                {t:"10:00", a:"Snorkeling at Pink Beach"}, 
                {t:"13:00", a:"Trekking Komodo Island (See Dragons)"}, 
                {t:"17:00", a:"Return to Harbor"}
            ],
            // Day 3
            [
                {t:"09:00", a:"Trip to Rangko Cave (Swimming in Cave)"}, 
                {t:"13:00", a:"Lunch at Local Restaurant"}, 
                {t:"15:00", a:"Relax at Hotel Pool or Spa"}, 
                {t:"18:00", a:"Italian Dinner at La Cucina"}
            ],
            // Day 4
            [
                {t:"08:00", a:"Trekking at Cunca Wulang Canyon"}, 
                {t:"12:00", a:"Lunch"}, 
                {t:"14:00", a:"Cultural Visit to Melo Village (Caci Dance)"}, 
                {t:"18:00", a:"Sunset Dinner at Atlantis Beach Club"}
            ],
            // Day 5
            [
                {t:"08:00", a:"Day Trip to Kanawa Island"}, 
                {t:"10:00", a:"Snorkeling & Beach Relaxation"}, 
                {t:"14:00", a:"See Flying Foxes at Kalong Island"}, 
                {t:"19:00", a:"Dinner on Boat"}
            ],
            // Day 6
            [
                {t:"09:00", a:"Trip to Taka Makassar Sandbar"}, 
                {t:"11:00", a:"Snorkeling with Manta Rays at Manta Point"}, 
                {t:"15:00", a:"Return to Labuan Bajo"}, 
                {t:"19:00", a:"Farewell Dinner"}
            ],
            // Day 7
            [
                {t:"08:00", a:"Morning Coffee at Exotic Komodo"}, 
                {t:"09:30", a:"Souvenir Shopping"}, 
                {t:"11:00", a:"Transfer to Airport for Departure"}
            ]
        ]
    };

    let scheduleHTML = '';
    // Jika lokasi tidak ada di db, default ke Bali
    const selectedSchedule = db[location] || db['Bali']; 

    for(let i = 0; i < days; i++) {
        // Ambil data hari ke-i, atau pakai default jika durasi melebihi data yg ada
        const dailyActs = selectedSchedule[i] || [
            {t:"09:00", a:"Free Leisure Time"}, 
            {t:"12:00", a:"Culinary Adventure"},
            {t:"18:00", a:"Relax & Dinner"}
        ];
        
        let listItems = '<div class="schedule-list">';
        dailyActs.forEach(item => {
            listItems += `
                <div class="schedule-item">
                    <span class="time-slot">${item.t}</span>
                    <span class="activity-desc">${item.a}</span>
                </div>`;
        });
        listItems += '</div>';

        scheduleHTML += `
        <div class="day-item">
            <span class="day-label">Day ${i + 1}</span>
            ${listItems}
        </div>`;
    }

    return scheduleHTML;
}