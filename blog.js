(function(){
    function renderPost(post){
        var tpl = document.getElementById('post-tpl');
        var clone = tpl.content.cloneNode(true);
        clone.querySelector('.post-title').textContent = post.title;
        clone.querySelector('.post-meta').textContent = post.date + ' — by ' + (post.author || 'mesh labs');
        clone.querySelector('.post-body').textContent = post.excerpt || '';
        var container = document.getElementById('posts');
        container.appendChild(clone);
    }
    fetch('blog.json').then(function(r){ if(!r.ok) return []; return r.json(); }).then(function(list){
        if(!list || !list.length) return;
        list.forEach(renderPost);
    }).catch(function(){ /* ignore */});
})();
