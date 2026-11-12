/**
 * ApexGuard VPN - Interactive Logic & Affiliate Conversion Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initFilterTabs();
  initSearchModal();
  initExpandableDetails();
  initCouponCopy();
  initMobileStickyBar();
  initCountdownTimer();
});

// 1. Category Filter Logic
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab-btn');
  const cards = document.querySelectorAll('.vpn-card-item');
  const countBadge = document.getElementById('visible-count');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');

      // Update Active Tab Styling
      tabs.forEach(t => {
        t.classList.remove('bg-cyan-500', 'text-slate-950', 'font-semibold', 'shadow-lg');
        t.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700/80');
      });
      tab.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700/80');
      tab.classList.add('bg-cyan-500', 'text-slate-950', 'font-semibold', 'shadow-lg');

      // Filter Cards
      let visible = 0;
      cards.forEach(card => {
        const itemCategories = card.getAttribute('data-categories') || '';
        if (category === 'all' || itemCategories.includes(category)) {
          card.style.display = 'block';
          visible++;
          // Trigger slight fade-in
          card.classList.remove('animate-fadeIn');
          void card.offsetWidth;
          card.classList.add('animate-fadeIn');
        } else {
          card.style.display = 'none';
        }
      });

      if (countBadge) {
        countBadge.innerText = `${visible} 款匹配`;
      }
    });
  });
}

// 2. Search Modal with Live Filtering & Keyboard Shortcut (Ctrl+K / Cmd+K)
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.open-search-modal');
  const modal = document.getElementById('search-modal');
  const closeBtn = document.getElementById('close-search-modal');
  const searchInput = document.getElementById('vpn-search-input');
  const searchResults = document.getElementById('search-results-container');

  if (!modal || !searchInput) return;

  const openModal = () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => searchInput.focus(), 50);
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    searchInput.value = '';
    renderSearchResults('');
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard shortcut Ctrl+K / Cmd+K and Esc
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('hidden') ? openModal() : closeModal();
    }
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Live query
  searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim().toLowerCase());
  });

  function renderSearchResults(query) {
    if (!searchResults) return;
    const cards = Array.from(document.querySelectorAll('.vpn-card-item'));

    if (!query) {
      searchResults.innerHTML = `
        <div class="text-center py-8 text-slate-500 text-sm">
          输入关键词搜索（如：Netflix、NordVPN、零日志、苹果设备、优惠券）
        </div>
      `;
      return;
    }

    const matches = cards.filter(card => {
      const name = card.getAttribute('data-name')?.toLowerCase() || '';
      const text = card.innerText.toLowerCase();
      return name.includes(query) || text.includes(query);
    });

    if (matches.length === 0) {
      searchResults.innerHTML = `
        <div class="text-center py-8 text-slate-400 text-sm">
          未检索到与 “<span class="text-cyan-400 font-medium">${query}</span>” 相关的 VPN 评测记录。
        </div>
      `;
      return;
    }

    searchResults.innerHTML = matches.map(m => {
      const name = m.getAttribute('data-name');
      const price = m.getAttribute('data-price');
      const discount = m.getAttribute('data-discount');
      const link = m.getAttribute('data-affiliate');
      const rating = m.getAttribute('data-rating');
      return `
        <div class="p-3 bg-slate-800/60 hover:bg-slate-700/60 rounded-xl border border-slate-700/50 flex items-center justify-between transition mb-2">
          <div class="flex items-center space-x-3">
            <span class="text-base font-bold text-white">${name}</span>
            <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">综合评分 ${rating}</span>
            <span class="text-xs text-cyan-300 font-mono">${discount}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-bold text-white">${price}/月</span>
            <a href="${link}" target="_blank" rel="sponsored nofollow noopener" class="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition">
              直达优惠 &rarr;
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

// 3. Expandable Technical Specs Breakdown
function initExpandableDetails() {
  document.querySelectorAll('.toggle-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      const icon = btn.querySelector('.toggle-icon');

      if (!targetEl) return;

      if (targetEl.classList.contains('hidden')) {
        targetEl.classList.remove('hidden');
        btn.querySelector('.toggle-text').innerText = '收起详细测试报告';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        targetEl.classList.add('hidden');
        btn.querySelector('.toggle-text').innerText = '展开完整实测指标与节点规格';
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });
}

// 4. One-click Coupon Code Copying
function initCouponCopy() {
  document.querySelectorAll('.copy-coupon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-coupon') || 'APEX2026';
      navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `✓ 已复制折扣码`;
        btn.classList.add('bg-emerald-600', 'text-white');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('bg-emerald-600', 'text-white');
        }, 2200);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  });
}

// 5. Mobile Sticky Conversion Bar
function initMobileStickyBar() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const heroSection = document.getElementById('hero-section');
  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      stickyBar.classList.remove('translate-y-full');
      stickyBar.classList.add('translate-y-0');
    } else {
      stickyBar.classList.add('translate-y-full');
      stickyBar.classList.remove('translate-y-0');
    }
  });
}

// 6. Real-time Countdown Timer for Highest Discount Offer
function initCountdownTimer() {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  if (!hoursEl || !minsEl || !secsEl) return;

  // Set 14 hours 28 mins rolling counter
  let remainingSeconds = (14 * 3600) + (28 * 60) + 45;

  setInterval(() => {
    if (remainingSeconds <= 0) {
      remainingSeconds = 24 * 3600; // Reset
    }
    remainingSeconds--;

    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    hoursEl.innerText = String(h).padStart(2, '0');
    minsEl.innerText = String(m).padStart(2, '0');
    secsEl.innerText = String(s).padStart(2, '0');
  }, 1000);
}

