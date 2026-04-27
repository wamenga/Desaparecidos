// Dados dos casos - Todas as 18 Províncias de Angola
let casosData = [
    { id: 1, nome: "Carlos Pereira", data: "2022-10-10", local: "Luanda - Bairro do Prenda", provincia: "Luanda", status: "investigacao", img: "https://randomuser.me/api/portraits/men/32.jpg", lat: -8.8390, lng: 13.2890, desc: "Desaparecido na zona do Prenda. Vestia camisa branca e calças jeans.", comentarios: [], favorito: false },
    { id: 2, nome: "Mariana Silva", data: "2023-02-05", local: "Benguela - Centro da Cidade", provincia: "Benguela", status: "encontrado", img: "https://randomuser.me/api/portraits/women/45.jpg", lat: -12.5780, lng: 13.4070, desc: "Encontrada em segurança na cidade do Lobito.", comentarios: [], favorito: false },
    { id: 3, nome: "João Mendes", data: "2021-08-20", local: "Huíla - Lubango", provincia: "Huíla", status: "encerrado", img: "https://randomuser.me/api/portraits/men/75.jpg", lat: -14.9170, lng: 13.4920, desc: "Caso encerrado com o reencontro da família.", comentarios: [], favorito: false },
    { id: 4, nome: "Fernanda Lima", data: "2024-03-01", local: "Cabinda - Centro da Cidade", provincia: "Cabinda", status: "investigacao", img: "https://randomuser.me/api/portraits/women/22.jpg", lat: -5.5600, lng: 12.1900, desc: "Última vez vista no mercado municipal.", comentarios: [], favorito: false },
    { id: 5, nome: "Roberto Alves", data: "2022-12-12", local: "Huambo - Bairro Popular", provincia: "Huambo", status: "encontrado", img: "https://randomuser.me/api/portraits/men/52.jpg", lat: -12.7760, lng: 15.7390, desc: "Retornou para casa em segurança.", comentarios: [], favorito: false },
    { id: 6, nome: "Patrícia Costa", data: "2024-01-15", local: "Bié - Kuito", provincia: "Bié", status: "investigacao", img: "https://randomuser.me/api/portraits/women/33.jpg", lat: -12.3830, lng: 16.9330, desc: "Desaparecida após sair do trabalho.", comentarios: [], favorito: false },
    { id: 7, nome: "Lucas Andrade", data: "2023-11-20", local: "Moxico - Luena", provincia: "Moxico", status: "investigacao", img: "https://randomuser.me/api/portraits/men/42.jpg", lat: -11.7830, lng: 19.9170, desc: "Última vez visto na zona central.", comentarios: [], favorito: false },
    { id: 8, nome: "Sofia Ramos", data: "2023-09-10", local: "Zaire - Soyo", provincia: "Zaire", status: "encontrado", img: "https://randomuser.me/api/portraits/women/55.jpg", lat: -6.1330, lng: 12.3670, desc: "Encontrada em outubro de 2023.", comentarios: [], favorito: false },
    { id: 9, nome: "António Kiala", data: "2024-02-20", local: "Luanda - Cazenga", provincia: "Luanda", status: "investigacao", img: "https://randomuser.me/api/portraits/men/28.jpg", lat: -8.8480, lng: 13.2780, desc: "Desaparecido na zona do Cazenga.", comentarios: [], favorito: false },
    { id: 10, nome: "Isabel dos Santos", data: "2024-04-05", local: "Uíge - Centro da Cidade", provincia: "Uíge", status: "investigacao", img: "https://randomuser.me/api/portraits/women/66.jpg", lat: -7.6170, lng: 15.0500, desc: "Vista pela última vez no mercado central.", comentarios: [], favorito: false },
    { id: 11, nome: "Manuel Cambinda", data: "2024-05-10", local: "Cuanza Sul - Sumbe", provincia: "Cuanza Sul", status: "investigacao", img: "https://randomuser.me/api/portraits/men/91.jpg", lat: -11.2000, lng: 13.8330, desc: "Desaparecido na zona da praia.", comentarios: [], favorito: false },
    { id: 12, nome: "Helena Francisco", data: "2024-01-20", local: "Namibe - Moçâmedes", provincia: "Namibe", status: "encontrado", img: "https://randomuser.me/api/portraits/women/88.jpg", lat: -15.1960, lng: 12.1520, desc: "Encontrada em segurança.", comentarios: [], favorito: false }
];

let currentFilter = "all";
let currentSort = "default";
let myMap;
let markersLayer;
let displayedCards = 6;
let currentCaseId = null;
let notificacoes = [];
let recognition = null;
let darkMode = false;

// Coordenadas de todas as províncias de Angola
const provinciaCoords = {
    'Luanda': { lat: -8.8390, lng: 13.2890, zoom: 12 },
    'Benguela': { lat: -12.5780, lng: 13.4070, zoom: 12 },
    'Huíla': { lat: -14.9170, lng: 13.4920, zoom: 12 },
    'Cabinda': { lat: -5.5600, lng: 12.1900, zoom: 12 },
    'Huambo': { lat: -12.7760, lng: 15.7390, zoom: 12 },
    'Bié': { lat: -12.3830, lng: 16.9330, zoom: 12 },
    'Moxico': { lat: -11.7830, lng: 19.9170, zoom: 11 },
    'Zaire': { lat: -6.1330, lng: 12.3670, zoom: 12 },
    'Uíge': { lat: -7.6170, lng: 15.0500, zoom: 12 },
    'Cuando Cubango': { lat: -15.1670, lng: 19.1670, zoom: 10 },
    'Cuanza Norte': { lat: -9.0830, lng: 14.9170, zoom: 12 },
    'Cuanza Sul': { lat: -11.2000, lng: 13.8330, zoom: 12 },
    'Namibe': { lat: -15.1960, lng: 12.1520, zoom: 12 },
    'Lunda Norte': { lat: -8.2830, lng: 19.5830, zoom: 11 },
    'Lunda Sul': { lat: -10.2830, lng: 20.7830, zoom: 11 },
    'Malange': { lat: -9.5330, lng: 16.3500, zoom: 12 },
    'Bengo': { lat: -8.5670, lng: 13.6670, zoom: 12 }
};

// Capitais de todas as províncias para referência
const capitaisAngola = [
    { nome: "Luanda", lat: -8.8390, lng: 13.2890, provincia: "Luanda" },
    { nome: "Benguela", lat: -12.5780, lng: 13.4070, provincia: "Benguela" },
    { nome: "Lubango", lat: -14.9170, lng: 13.4920, provincia: "Huíla" },
    { nome: "Cabinda", lat: -5.5600, lng: 12.1900, provincia: "Cabinda" },
    { nome: "Huambo", lat: -12.7760, lng: 15.7390, provincia: "Huambo" },
    { nome: "Kuito", lat: -12.3830, lng: 16.9330, provincia: "Bié" },
    { nome: "Luena", lat: -11.7830, lng: 19.9170, provincia: "Moxico" },
    { nome: "Mbanza Kongo", lat: -6.2670, lng: 14.2500, provincia: "Zaire" },
    { nome: "Uíge", lat: -7.6170, lng: 15.0500, provincia: "Uíge" },
    { nome: "Menongue", lat: -14.6670, lng: 17.6830, provincia: "Cuando Cubango" },
    { nome: "Ndalatando", lat: -9.3000, lng: 14.9170, provincia: "Cuanza Norte" },
    { nome: "Sumbe", lat: -11.2000, lng: 13.8330, provincia: "Cuanza Sul" },
    { nome: "Moçâmedes", lat: -15.1960, lng: 12.1520, provincia: "Namibe" },
    { nome: "Dundo", lat: -7.3830, lng: 20.8330, provincia: "Lunda Norte" },
    { nome: "Saurimo", lat: -9.6670, lng: 20.4000, provincia: "Lunda Sul" },
    { nome: "Malange", lat: -9.5330, lng: 16.3500, provincia: "Malange" },
    { nome: "Caxito", lat: -8.5670, lng: 13.6670, provincia: "Bengo" }
];

// Carregar dados salvos do localStorage
function loadSavedData() {
    const savedFavs = localStorage.getItem('favoritosAngola');
    if(savedFavs) {
        const favs = JSON.parse(savedFavs);
        casosData = casosData.map(c => ({ ...c, favorito: favs.includes(c.id) }));
    }
    
    const savedComments = localStorage.getItem('comentariosAngola');
    if(savedComments) {
        const comments = JSON.parse(savedComments);
        casosData = casosData.map(c => ({ ...c, comentarios: comments[c.id] || [] }));
    }
}

function saveFavoritos() {
    const favoritos = casosData.filter(c => c.favorito).map(c => c.id);
    localStorage.setItem('favoritosAngola', JSON.stringify(favoritos));
}

function saveComentarios() {
    const comments = {};
    casosData.forEach(c => { if(c.comentarios.length) comments[c.id] = c.comentarios; });
    localStorage.setItem('comentariosAngola', JSON.stringify(comments));
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.innerHTML = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function addNotification(message) {
    notificacoes.unshift({ message, date: new Date(), read: false });
    updateNotificationBadge();
    showToast(message);
}

function updateNotificationBadge() {
    const unread = notificacoes.filter(n => !n.read).length;
    const badge = document.getElementById('notifCount');
    if(badge) badge.innerText = unread;
}

function updateStats() {
    document.getElementById('totalCasos').innerText = casosData.length;
    document.getElementById('investigacaoCount').innerText = casosData.filter(c => c.status === 'investigacao').length;
    document.getElementById('encontradosCount').innerText = casosData.filter(c => c.status === 'encontrado').length;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-pt');
}

function getStatusClass(status) {
    if(status === 'investigacao') return 'status-investigacao';
    if(status === 'encontrado') return 'status-encontrado';
    return 'status-encerrado';
}

function getStatusText(status) {
    if(status === 'investigacao') return 'EM INVESTIGAÇÃO';
    if(status === 'encontrado') return 'ENCONTRADO';
    return 'ENCERRADO';
}

function renderCards() {
    const container = document.getElementById("cardsContainer");
    if(!container) return;
    
    let filtered = currentFilter === "all" ? [...casosData] : casosData.filter(c => c.status === currentFilter);
    
    if(currentSort === 'date') {
        filtered.sort((a,b) => new Date(b.data) - new Date(a.data));
    }
    
    const displayed = filtered.slice(0, displayedCards);
    
    container.innerHTML = displayed.map(caso => `
        <div class="card" data-id="${caso.id}">
            <div class="card-img" style="background-image: url('${caso.img}'); position:relative;">
                <button class="favorite-btn" style="position:absolute; top:10px; right:10px; background:white; border-radius:50%; width:35px; height:35px; display:flex; align-items:center; justify-content:center;" onclick="event.stopPropagation(); toggleFavorito(${caso.id})">
                    <i class="fas ${caso.favorito ? 'fa-star' : 'fa-star-o'}"></i>
                </button>
            </div>
            <div class="card-content">
                <h3>${caso.nome}</h3>
                <div class="card-date"><i class="fas fa-calendar-alt"></i> ${formatDate(caso.data)}</div>
                <div class="card-date"><i class="fas fa-map-marker-alt"></i> ${caso.local}</div>
                <span class="card-status ${getStatusClass(caso.status)}"><i class="fas ${caso.status === 'investigacao' ? 'fa-search' : (caso.status === 'encontrado' ? 'fa-check' : 'fa-archive')}"></i> ${getStatusText(caso.status)}</span>
                <button class="btn-small" onclick="verDetalhes(${caso.id})"><i class="fas fa-info-circle"></i> Ver Detalhes</button>
            </div>
        </div>
    `).join('');
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if(loadMoreBtn) {
        if(filtered.length <= displayedCards) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

function loadMore() {
    displayedCards += 3;
    renderCards();
    atualizarMapa();
}

function toggleFavorito(id) {
    const caso = casosData.find(c => c.id === id);
    if(caso) {
        caso.favorito = !caso.favorito;
        saveFavoritos();
        renderCards();
        showToast(caso.favorito ? 'Caso adicionado aos favoritos!' : 'Caso removido dos favoritos');
    }
}

window.verDetalhes = function(id) {
    const caso = casosData.find(c => c.id === id);
    if(!caso) return;
    
    currentCaseId = id;
    const modal = document.getElementById('detalhesModal');
    const content = document.getElementById('detalhesContent');
    
    content.innerHTML = `
        <div style="text-align:center;">
            <img src="${caso.img}" style="width:140px; height:140px; border-radius:50%; object-fit:cover; margin-bottom:15px; border:4px solid #ff9800;">
            <h2 style="color:#0d47a1;">${caso.nome}</h2>
            <p><i class="fas fa-calendar-alt"></i> <strong>Data:</strong> ${formatDate(caso.data)}</p>
            <p><i class="fas fa-map-marker-alt"></i> <strong>Local:</strong> ${caso.local}</p>
            <p><i class="fas fa-flag"></i> <strong>Província:</strong> ${caso.provincia}</p>
            <p><i class="fas fa-tag"></i> <strong>Status:</strong> <span class="${getStatusClass(caso.status)}" style="padding:3px 12px; border-radius:20px; display:inline-block;">${getStatusText(caso.status)}</span></p>
            <p><i class="fas fa-info-circle"></i> <strong>Descrição:</strong> ${caso.desc}</p>
            <button class="btn-primary" onclick="mostrarNoMapa(${caso.lat}, ${caso.lng}, '${caso.nome}')"><i class="fas fa-map"></i> Ver Localização</button>
            <div class="share-buttons" style="margin-top:15px;">
                <button class="share-btn share-whatsapp" onclick="compartilharCaso('${caso.nome}', '${caso.local}')"><i class="fab fa-whatsapp"></i> Compartilhar</button>
            </div>
        </div>
    `;
    
    loadComments();
    modal.classList.add('active');
};

function loadComments() {
    const caso = casosData.find(c => c.id === currentCaseId);
    if(!caso) return;
    
    const commentsDiv = document.getElementById('commentsList');
    if(caso.comentarios.length === 0) {
        commentsDiv.innerHTML = '<p style="color:#999;"><i class="fas fa-comment-slash"></i> Nenhum comentário ainda. Seja o primeiro a comentar!</p>';
    } else {
        commentsDiv.innerHTML = caso.comentarios.map(com => `
            <div class="comment">
                <strong><i class="fas fa-user-circle"></i> ${com.autor}</strong> <small><i class="far fa-clock"></i> ${new Date(com.data).toLocaleString('pt-pt')}</small>
                <p>${com.texto}</p>
            </div>
        `).join('');
    }
}

window.adicionarComentario = function() {
    const input = document.getElementById('newComment');
    const texto = input.value.trim();
    if(!texto) return;
    
    const userName = localStorage.getItem('userName') || 'Anônimo';
    const caso = casosData.find(c => c.id === currentCaseId);
    
    caso.comentarios.push({
        autor: userName,
        texto: texto,
        data: new Date().toISOString()
    });
    
    saveComentarios();
    loadComments();
    input.value = '';
    showToast('Comentário adicionado com sucesso!');
};

window.compartilharWhatsApp = function() {
    const text = `🔍 AJUDE A ENCONTRAR! Ana Souza está desaparecida em Luanda, Angola desde 15/04/2023. Qualquer informação, contacte as autoridades. #BusqueDesaparecidosAngola`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

window.compartilharTwitter = function() {
    const text = `🔍 AJUDE A ENCONTRAR! Ana Souza desaparecida em Luanda, Angola. Compartilhe! #BusqueDesaparecidosAngola`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
};

window.compartilharFacebook = function() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
};

window.compartilharCaso = function(nome, local) {
    const text = `🔍 AJUDE A ENCONTRAR ${nome.toUpperCase()}! Desaparecido(a) em ${local}, Angola. Qualquer informação, denuncie no BusqueDesaparecidos. Compartilhe!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
};

// Função para inicializar o mapa de Angola
function initMap() {
    // Centro de Angola
    myMap = L.map('mapid').setView([-11.2027, 17.8739], 6);
    
    // Mapa base com estilo mais limpo
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Angola | BusqueDesaparecidos',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(myMap);
    
    // Adicionar escala métrica
    L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(myMap);
    
    markersLayer = L.layerGroup().addTo(myMap);
    atualizarMapa();
    
    // Adicionar todas as capitais de província como referência
    adicionarCapitaisReferencia();
}

function adicionarCapitaisReferencia() {
    // Adicionar marcadores azuis para as capitais (apenas referência)
    capitaisAngola.forEach(capital => {
        const capitalIcon = L.divIcon({
            html: `<div style="background-color: #2196f3; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
            iconSize: [16, 16],
            className: 'capital-marker'
        });
        
        L.marker([capital.lat, capital.lng], { icon: capitalIcon })
            .addTo(myMap)
            .bindPopup(`
                <div style="text-align:center;">
                    <i class="fas fa-city" style="color:#2196f3; font-size:20px;"></i><br>
                    <strong>${capital.nome}</strong><br>
                    Capital da Província de ${capital.provincia}
                </div>
            `);
    });
}

function atualizarMapa() {
    if(!markersLayer) return;
    markersLayer.clearLayers();
    
    const filtered = currentFilter === "all" ? casosData : casosData.filter(c => c.status === currentFilter);
    
    filtered.forEach(caso => {
        let markerColor = caso.status === 'investigacao' ? '#e53935' : (caso.status === 'encontrado' ? '#4caf50' : '#9e9e9e');
        let markerIcon = caso.status === 'investigacao' ? 'fa-exclamation-triangle' : (caso.status === 'encontrado' ? 'fa-check' : 'fa-check-circle');
        
        const customIcon = L.divIcon({
            html: `<div style="background-color: ${markerColor}; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><i class="fas ${markerIcon}" style="color:white; font-size:16px;"></i></div>`,
            iconSize: [38, 38],
            popupAnchor: [0, -19],
            className: 'custom-marker'
        });
        
        L.marker([caso.lat, caso.lng], { icon: customIcon })
            .addTo(markersLayer)
            .bindPopup(`
                <div style="min-width: 220px;">
                    <b><i class="fas fa-user"></i> ${caso.nome}</b><br>
                    <i class="fas fa-calendar-alt"></i> ${formatDate(caso.data)}<br>
                    <i class="fas fa-map-marker-alt"></i> ${caso.local}<br>
                    <i class="fas fa-flag"></i> ${caso.provincia}<br>
                    <span style="color:${markerColor}; font-weight:bold;"><i class="fas fa-tag"></i> ${getStatusText(caso.status)}</span><br>
                    <button onclick="verDetalhes(${caso.id})" style="margin-top:10px; padding:6px 15px; background:#0d47a1; color:white; border:none; border-radius:25px; cursor:pointer; width:100%;"><i class="fas fa-info-circle"></i> Ver Detalhes</button>
                </div>
            `);
    });
    
    // Adicionar novamente as capitais como referência (para não serem sobrescritas)
    adicionarCapitaisReferencia();
}

// Função para zoom em província específica
function zoomParaProvincia(provincia) {
    const coords = provinciaCoords[provincia];
    if(coords && myMap) {
        myMap.setView([coords.lat, coords.lng], coords.zoom || 11);
        showToast(`Centralizando em ${provincia}`);
    }
}

// Função para mostrar todas as províncias
function mostrarTodasProvincias() {
    if(myMap) {
        myMap.setView([-11.2027, 17.8739], 6);
        showToast('Visualizando todas as províncias de Angola');
    }
}

window.mostrarNoMapa = function(lat, lng, nome) {
    if(myMap) {
        myMap.setView([lat, lng], 14);
        L.popup()
            .setLatLng([lat, lng])
            .setContent(`
                <div style="text-align:center;">
                    <i class="fas fa-map-marker-alt" style="color:#e53935; font-size:24px;"></i><br>
                    <strong>${nome}</strong><br>
                    Localização aproximada do desaparecimento em Angola.
                </div>
            `)
            .openOn(myMap);
        fecharModal('detalhesModal');
    }
};

function initVoiceSearch() {
    if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'pt-PT';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;
            buscarPorNome();
            showToast(`Busca por voz: "${transcript}"`);
        };
        
        recognition.onerror = () => {
            showToast('Não foi possível capturar o áudio');
        };
    } else {
        showToast('Seu navegador não suporta busca por voz');
    }
}

function buscarPorNome() {
    const term = document.getElementById('searchInput').value.toLowerCase().trim();
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    
    progressBar.style.display = 'block';
    progressFill.style.width = '0%';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        progressFill.style.width = progress + '%';
        if(progress >= 100) clearInterval(interval);
    }, 50);
    
    setTimeout(() => {
        if(!term) {
            currentFilter = "all";
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
            renderCards();
            atualizarMapa();
            progressBar.style.display = 'none';
            return;
        }
        
        const filteredCards = casosData.filter(c => c.nome.toLowerCase().includes(term) || c.local.toLowerCase().includes(term) || c.provincia.toLowerCase().includes(term));
        const container = document.getElementById("cardsContainer");
        
        if(filteredCards.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:40px; background:white; border-radius:20px;"><i class="fas fa-search"></i> Nenhum caso encontrado para "${term}" em Angola</div>`;
            if(markersLayer) markersLayer.clearLayers();
            adicionarCapitaisReferencia();
        } else {
            container.innerHTML = filteredCards.map(caso => `
                <div class="card">
                    <div class="card-img" style="background-image: url('${caso.img}');"></div>
                    <div class="card-content">
                        <h3>${caso.nome}</h3>
                        <div class="card-date"><i class="fas fa-calendar-alt"></i> ${formatDate(caso.data)}</div>
                        <div class="card-date"><i class="fas fa-map-marker-alt"></i> ${caso.local}</div>
                        <span class="card-status ${getStatusClass(caso.status)}">${getStatusText(caso.status)}</span>
                        <button class="btn-small" onclick="verDetalhes(${caso.id})"><i class="fas fa-info-circle"></i> Ver Detalhes</button>
                    </div>
                </div>
            `).join('');
            
            if(markersLayer) {
                markersLayer.clearLayers();
                filteredCards.forEach(caso => {
                    let markerColor = caso.status === 'investigacao' ? '#e53935' : (caso.status === 'encontrado' ? '#4caf50' : '#9e9e9e');
                    const customIcon = L.divIcon({
                        html: `<div style="background-color: ${markerColor}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border:2px solid white;"><i class="fas fa-map-marker-alt" style="color:white; font-size:14px;"></i></div>`,
                        iconSize: [32, 32]
                    });
                    L.marker([caso.lat, caso.lng], { icon: customIcon }).addTo(markersLayer).bindPopup(`<b>${caso.nome}</b><br>${formatDate(caso.data)}<br>${caso.provincia}`);
                });
                adicionarCapitaisReferencia();
            }
        }
        
        progressBar.style.display = 'none';
    }, 250);
}

function abrirDenuncia() {
    document.getElementById('denunciaModal').classList.add('active');
}

function fecharModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function toggleDarkModeGlobal() {
    darkMode = !darkMode;
    if(darkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeBtn').innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    } else {
        document.body.classList.remove('dark-mode');
        document.getElementById('darkModeBtn').innerHTML = '<i class="fas fa-moon"></i> Modo Escuro';
    }
    localStorage.setItem('darkModeAngola', darkMode);
}

function loadDarkModePreference() {
    const savedDarkMode = localStorage.getItem('darkModeAngola');
    if(savedDarkMode === 'true') {
        darkMode = true;
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeBtn').innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName') || 'Usuário';
    const userDisplay = document.getElementById('userNameDisplay');
    if(userDisplay) {
        userDisplay.innerHTML = `<i class="fas fa-user-circle"></i> Olá, ${userName} <span class="notification-badge"><i class="fas fa-bell"></i><span class="badge-count" id="notifCount">0</span></span>`;
    }
    
    loadSavedData();
    loadDarkModePreference();
    initMap();
    renderCards();
    updateStats();
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            displayedCards = 6;
            renderCards();
            atualizarMapa();
        });
    });
    
    // Busca
    const searchBtn = document.getElementById('searchBtn');
    const voiceBtn = document.getElementById('voiceSearchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if(searchBtn) searchBtn.addEventListener('click', buscarPorNome);
    if(voiceBtn) voiceBtn.addEventListener('click', () => { if(recognition) recognition.start(); else initVoiceSearch(); });
    if(searchInput) searchInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') buscarPorNome(); });
    
    // Load more
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if(loadMoreBtn) loadMoreBtn.addEventListener('click', () => { displayedCards += 3; renderCards(); });
    
    // Sort
    const sortBtn = document.getElementById('sortByDateBtn');
    if(sortBtn) sortBtn.addEventListener('click', () => {
        currentSort = currentSort === 'date' ? 'default' : 'date';
        displayedCards = 6;
        renderCards();
        showToast(currentSort === 'date' ? 'Ordenado por data!' : 'Ordenação padrão');
    });
    
    // Report
    const reportBtn = document.getElementById('reportBtn');
    const denunciarLink = document.getElementById('denunciarLink');
    if(reportBtn) reportBtn.addEventListener('click', abrirDenuncia);
    if(denunciarLink) denunciarLink.addEventListener('click', (e) => { e.preventDefault(); abrirDenuncia(); });
    
    // Refresh map
    const refreshBtn = document.getElementById('refreshMapBtn');
    if(refreshBtn) refreshBtn.addEventListener('click', () => { atualizarMapa(); showToast('Mapa atualizado!'); });
    
    // Zoom buttons
    const zoomLuanda = document.getElementById('zoomLuanda');
    const zoomBenguela = document.getElementById('zoomBenguela');
    const zoomHuila = document.getElementById('zoomHuila');
    const zoomAll = document.getElementById('zoomAll');
    
    if(zoomLuanda) zoomLuanda.addEventListener('click', () => zoomParaProvincia('Luanda'));
    if(zoomBenguela) zoomBenguela.addEventListener('click', () => zoomParaProvincia('Benguela'));
    if(zoomHuila) zoomHuila.addEventListener('click', () => zoomParaProvincia('Huíla'));
    if(zoomAll) zoomAll.addEventListener('click', mostrarTodasProvincias);
    
    // Dark mode
    const darkModeBtn = document.getElementById('darkModeBtn');
    if(darkModeBtn) darkModeBtn.addEventListener('click', toggleDarkModeGlobal);
    
    // Help
    const helpBtn = document.getElementById('helpBtn');
    if(helpBtn) helpBtn.addEventListener('click', () => document.getElementById('helpModal').classList.add('active'));
    
    // View all
    const viewAllBtn = document.getElementById('viewAllBtn');
    if(viewAllBtn) viewAllBtn.addEventListener('click', () => { displayedCards = casosData.length; renderCards(); showToast('Exibindo todos os casos'); });
    
    // Home link
    const homeLink = document.getElementById('homeLink');
    if(homeLink) homeLink.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    
    // Admin link
    const adminLink = document.getElementById('adminLink');
    if(adminLink) adminLink.addEventListener('click', (e) => { e.preventDefault(); showToast('Área administrativa em desenvolvimento'); });
    
    // Meus casos link
    const meusCasosLink = document.getElementById('meusCasosLink');
    if(meusCasosLink) meusCasosLink.addEventListener('click', (e) => { e.preventDefault(); showToast('Seus casos favoritos estão salvos!'); });
    
    // Fechar modais ao clicar fora
    window.onclick = (event) => {
        if(event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    };
    
    // Ajustar mapa
    setTimeout(() => {
        if(myMap) myMap.invalidateSize();
    }, 300);
});

// Form de denúncia
const denunciaForm = document.getElementById('denunciaForm');
if(denunciaForm) {
    denunciaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const provinciaSelecionada = document.getElementById('denunciaProvincia').value;
        const localEspecifico = document.getElementById('denunciaLocal').value;
        const coords = provinciaCoords[provinciaSelecionada] || { lat: -8.8390, lng: 13.2890 };
        
        const novoCaso = {
            id: casosData.length + 1,
            nome: document.getElementById('denunciaNome').value,
            data: document.getElementById('denunciaData').value,
            local: `${provinciaSelecionada} - ${localEspecifico}`,
            provincia: provinciaSelecionada,
            status: "investigacao",
            img: document.getElementById('denunciaImagem').value || "https://randomuser.me/api/portraits/lego/1.jpg",
            lat: coords.lat,
            lng: coords.lng,
            desc: document.getElementById('denunciaInfo').value,
            comentarios: [],
            favorito: false
        };
        
        casosData.push(novoCaso);
        addNotification(`Novo caso registrado: ${novoCaso.nome} - ${provinciaSelecionada}`);
        renderCards();
        atualizarMapa();
        updateStats();
        
        fecharModal('denunciaModal');
        this.reset();
        showToast(`Denúncia registrada! Caso #${novoCaso.id} será analisado pelas autoridades angolanas.`);
    });
}