console.log("Welcome to the shop!");

document.addEventListener("DOMContentLoaded", () => {

  const Parent = document.getElementById("products");

  let allProducts = [];
  let currentPage = 1;
  const itemsPerPage = 6;

  async function fetchProd() {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      allProducts = await response.json();
      updateView();
    } catch (error) {
      Parent.innerHTML = `<h1>There is something wrong!!! ${error}</h1>`;
    }
  }

  function paginate(data) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }

  function updateView() {
    const paginatedData = paginate(allProducts);
    displayProd(paginatedData);
  }

  function displayProd(data) {
    Parent.innerHTML = "";

    data.forEach(element => {

      const child = document.createElement("div");
      child.className =
        "w-[280px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col";

      const img = document.createElement("img");
      img.src = element.image;
      img.className = "h-[260px] object-contain bg-gray-100 p-4";

      const content = document.createElement("div");
      content.className = "p-4 flex flex-col gap-2";

      const title = document.createElement("h3");
      title.textContent = element.title;
      title.className = "text-sm font-semibold line-clamp-2";

      const price = document.createElement("p");
      price.textContent = `$${element.price}`;
      price.className = "text-green-600 font-bold";

      const desc = document.createElement("p");
      desc.textContent = element.description;
      desc.className = "text-xs text-gray-500 line-clamp-3";

      const rating = document.createElement("span");
      rating.textContent = `⭐ ${element.rating.rate} (${element.rating.count})`;
      rating.className = "text-xs text-gray-600";

      content.append(title, price, desc, rating);
      child.append(img, content);
      Parent.appendChild(child);
    });
  }

  // PAGINATION BUTTONS
  document.querySelectorAll("#pagination a").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();

      const page = btn.dataset.page;
      const totalPages = Math.ceil(allProducts.length / itemsPerPage);

      if (page === "prev" && currentPage > 1) currentPage--;
      else if (page === "next" && currentPage < totalPages) currentPage++;
      else if (!isNaN(page)) currentPage = Number(page);

      updateView();
    });
  });

  fetchProd();
});
