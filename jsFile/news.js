const loadNewsCatgories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayCatgories(data.data.news_category))
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCatgories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
        console.log("Is not working");
    }
}

const displayCatgories = (catagory) => {
    // console.log(catagory);
    catagory.forEach(element => {
        // console.log(element);
        // console.log(element.category_id);

        const newsCatgories = document.getElementById('news-catgories');
        const p = document.createElement('p');
        p.innerHTML = `   <a onclick="allNewsLoad('${element.category_id}', 
        '${element.category_name}')" class="nav-link" href="#"><img src="" alt="" />${element.category_name}</a>`
        newsCatgories.appendChild(p)
    });


}
// loadNewsCatgories();

const allNewsLoad = (category_id, category_name) => {
    // console.log(category_id, category_name);
    document.getElementById('catagory-name').innerHTML = category_name;
    const url2 = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url2)
        .then(res => res.json())
        .then(items => allnewsDisplay(items.data));


}
const allnewsDisplay = (items) => {
    // console.log(items);
    const newsContainer = document.getElementById('news-container')
    items.forEach(news => {
        // console.log(news)
        const { thumbnail_url, title, details, author, total_view, rating, _id } = news;
        // console.log(_id);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add("card", "mb-3");
        newsDiv.innerHTML = `
            
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 mt-4">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${details.slice(1, 400)}</p>
                       
                    </div>
                    <div class="card-footer bg-body border-0 d-flex justify-content-between">
                                    <div class="d-flex justify-content-center align-items-center gap-2">
                                        <div>
                                            <img style="height:40px; width:40px;" class="img-fluid rounded" src="${author.img}">
                                        </div>
                                        <div class="mt-3">
                                                <strong>${author.name ? author.name : "Not Found !!!"}</strong>
                                                <p>${author.published_date ? author.published_date : "Not FounD!!!"}</p>
                                        </div>
                                    </div>

                                    <div  class="d-flex justify-content-center      align-items-center gap-2 mt-3">
                                          <i class="fa-solid fa-eye"></i>
                                          <strong>${total_view ? total_view : "No Views !!!"}</strong>
                                    </div>

                                    <div  class="d-flex justify-content-center      align-items-center gap-2 mt-3">
                                          <i class="fa-solid fa-star"></i>
                                          <i class="fa-solid fa-star"></i>
                                          <i class="fa-solid fa-star"></i>
                                          <i class="fa-regular fa-star-half-stroke"></i>
                                          <i class="fa-regular fa-star"></i>
                                          <strong>${rating.number ? rating.number : "No Rattings !!!"}</strong>
                                    </div>

                                    <div  class="d-flex justify-content-center      align-items-center gap-2 mt-3">
                                         <i onclick="modalDataLoad('${_id}')"   data-bs-toggle="modal" data-bs-target="#exampleModal" class="fa-solid fa-up-right-from-square">
                                         </i>
                                    </div>
                            </div>
                  
                </div>
               
            </div>
      `
        newsContainer.appendChild(newsDiv);
    })
}

const modalDataLoad = async (_id) => {
    console.log("its working babe", _id)
    const modalURL = `https://openapi.programming-hero.com/api/news/${_id}`;
    // console.log(modalURL);
    const res = await fetch(modalURL);
    const dop = await res.json();
    modalDataDisplay(dop.data[0])
}
const modalDataDisplay = (modal) => {
    // console.log(modal);
    const { title, image_url, rating, others_info, author, total_view } = modal;
    const modalContainer = document.getElementById("modal-body");
    // const modalDiv = document.createElement('div');
    // modalDiv.classList.add('modal-dialog');
    modalContainer.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${title}<span class="ms-2 btn btn-primary p-1 bg-warning">${rating.badge ? rating.badge : "No Badge ##"}</span></h1>
                       
                        
                        <i class="fa-solid fa-delete-left fa-2x" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body">
                        <img class="img-fluid" src="${image_url}">
                    </div>
                   
                    <div class="card-footer bg-body border-0 d-flex justify-content-between">
                                    <div class="d-flex justify-content-center align-items-center gap-2">
                                        <div>
                                            <img style="height:40px; width:40px;" class="img-fluid rounded" src="${author.img}">
                                        </div>
                                        <div class="mt-3">
                                                <strong>${author.name}</strong>
                                                <p>${author.published_date}</p>
                                        </div>
                                    </div>

                                    <div  class="d-flex justify-content-center      align-items-center gap-2 mt-3">
                                          <i class="fa-solid fa-eye"></i>
                                          <strong>${total_view}</strong>
                                    </div>
                                    <div  class="d-flex justify-content-center      align-items-center gap-2 mt-3">
                                        <span class="ms-2 btn btn-primary p-1 bg-warning">${others_info.is_trending ? "Trending" : "No Trending"}</span></h1>
                                    </div>

                                

                                  
                    </div>
                  
                </div>
                </div>
                </div>

    `
    // modalContainer.appendChild(modalDiv);
}

