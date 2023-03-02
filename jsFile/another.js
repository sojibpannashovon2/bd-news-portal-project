

const p = document.createElement('p');
p.innerHTML = `   <a onclick="allNewsLoad('${element.category_id}', 
        '${element.category_name}')" class="nav-link" href="#"><img src="" alt="" />${element.category_name}</a>`
newsCatgories.appendChild(p)



const newsContainer = document.getElementById('news-container')
const newsDiv = document.createElement('div');
newsDiv.classList.add("card", "mb-3");
newsDiv.innerHTML = `
            
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="..." class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
      `
newsContainer.appendChild(newsDiv);