(function(){
		function makeSplit(el){
				var text = el.textContent;
				el.textContent = '';
				var spans = [];
				for (var i = 0; i < text.length; i++){
						var ch = text[i];
						if(ch === ' '){
								el.appendChild(document.createTextNode('\u00A0'));
								continue;
						}
						var span = document.createElement('span');
						span.className = 'char';
						span.textContent = ch;
						span.dataset.index = i;
						span.dataset.baseWeight = '400';
						span.style.fontWeight = '400';
						el.appendChild(span);
						spans.push(span);
				}
				function resetSplit(container){
						container.querySelectorAll('.char').forEach(function(x){
								x.style.fontWeight = x.dataset.baseWeight;
						});
				}
				function highlightRadial(container, centerIndex, radius){
						var items = container.querySelectorAll('.char');
						items.forEach(function(item, idx){
								var dist = Math.abs(idx - centerIndex);
								var w = Math.max(400, 900 - dist * 150);
								item.style.fontWeight = String(w);
						});
				}
				el.querySelectorAll('.char').forEach(function(ch){
						ch.addEventListener('mouseenter', function(){ highlightRadial(el, parseInt(this.dataset.index,10), 3); });
						ch.addEventListener('mouseleave', function(){ resetSplit(el); });
						ch.addEventListener('focus', function(){ highlightRadial(el, parseInt(this.dataset.index,10), 3); });
						ch.addEventListener('blur', function(){ resetSplit(el); });
				});
		}
		function init(){
				document.querySelectorAll('.split').forEach(function(el){
						makeSplit(el);
				});
		}
		if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
		else init();
})();

(function(){
		function $(s){ return document.querySelector(s); }
		var badge = $('.routing-badge');
		var desc = $('#routing-desc');
		var params = $('#routing-params');
		var cells = Array.from(document.querySelectorAll('.mesh-cell'));
		if(!badge || !desc || cells.length < 4) return;
		var state = {mode:0, active:0};
		var modes = [
				{name:'top-1', params:'173M active parameters', picks:[0]},
				{name:'top-2', params:'242M active parameters', picks:[0,1]}
		];
		function clearBonds(){ 
				cells.forEach(function(c){ c.style.boxShadow='none'; c.style.borderColor='rgba(0,0,0,0.12)'; });
		}
		function step(){
				clearBonds();
				state.mode = (state.mode+1)%modes.length;
				var m = modes[state.mode];
				badge.textContent = m.name;
				params.textContent = m.params;
				var picks = m.picks;

				cells.forEach(function(c, idx){
						if(picks.indexOf(idx) !== -1){
								c.style.borderColor='rgba(255,0,0,0.8)';
						} else {
								c.style.borderColor='rgba(0,0,0,0.12)';
						}
				});
		}
		setTimeout(step, 500);
		setInterval(step, 2200);
})();
