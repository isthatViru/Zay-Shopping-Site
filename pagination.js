let currentPage = 1;
const itemsPerPage = 6;

// Example data (REMOVE if already fetching from API)
const allProducts = Array.from({ length: 18 }, (_, i) => ({
  title: `Product ${i + 1}`
}));

function paginate(data) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

function updateView() {
  const pageData = paginate(allProducts);
  renderProducts(pageData);
  highlightActivePage();
}

function renderProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded";
    div.textContent = p.title;
    container.appendChild(div);
  });
}

// Pagination click handling
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

function highlightActivePage() {
  document.querySelectorAll(".page-btn").forEach(btn => {
    btn.classList.remove("bg-green-600", "text-white");
    if (Number(btn.dataset.page) === currentPage) {
      btn.classList.add("bg-green-600", "text-white");
    }
  });
}

// INIT
updateView();
