(function () {
  const data = window.QB_KNOWLEDGE_LINKS;
  if (!data) return;
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  function render() {
    const detail = document.querySelector('.question-detail[data-question-id]');
    if (!detail || detail.querySelector('.knowledge-link-panel')) return;
    const questionId = detail.dataset.questionId;
    const link = data.links[questionId];
    if (!link) return;
    const card = data.cards[link.knowledgeId];
    if (!card) return;
    const panel = document.createElement('section');
    panel.className = 'knowledge-link-panel';
    panel.innerHTML = `<div class="knowledge-link-head"><div><small>对应课堂知识点</small><h3>${esc(card.title)}</h3></div><button type="button" class="knowledge-toggle">展开笔记</button></div><p>${esc(card.oneLine)}</p><div class="knowledge-body" hidden><h4>课堂重点</h4><ul>${card.core.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${card.explain.map(x=>`<p>${esc(x)}</p>`).join('')}<div class="knowledge-related"><b>同知识点题目：${(data.reverse[card.id]||[]).length} 道</b></div></div>`;
    panel.querySelector('.knowledge-toggle').onclick = event => { const body = panel.querySelector('.knowledge-body'); body.hidden = !body.hidden; event.currentTarget.textContent = body.hidden ? '展开笔记' : '收起笔记'; };
    const stem = detail.querySelector('.stem-box');
    (stem || detail.querySelector('.detail-header')).insertAdjacentElement('afterend', panel);
  }
  new MutationObserver(render).observe(document.body, { childList: true, subtree: true });
  render();
})();
