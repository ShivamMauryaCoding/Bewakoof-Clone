import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function MenPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    sizes: [],
    ratings: "",
    discount: "",
  });
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/Product")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const category = searchParams.getAll("category");
    const sizes = searchParams.getAll("sizes");
    const ratings = searchParams.get("ratings") || "";
    const discount = searchParams.get("discount") || "";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";

    setFilters({ category, sizes, ratings, discount });
    setSortOrder(sort);
    setSearchQuery(search);
  }, [searchParams]);

  const updateURLParams = (key, value, type = "single") => {
    const newParams = new URLSearchParams(searchParams);
    if (type === "single") {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    } else {
      const current = newParams.getAll(key);
      const exists = current.includes(value);
      if (exists) {
        newParams.delete(key);
        current
          .filter((v) => v !== value)
          .forEach((v) => newParams.append(key, v));
      } else {
        current.forEach((v) => newParams.append(key, v));
        newParams.append(key, value);
      }
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  const handleFilterChange = (type, value) => {
    if (type === "ratings" || type === "discount") {
      updateURLParams(type, value);
    } else {
      updateURLParams(type, value, "multi");
    }
  };

  useEffect(() => {
    let temp = [...data];

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      temp = temp.filter(
        (item) =>
          item.description?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.size?.toLowerCase().includes(q)
      );
    }

    if (filters.category.length > 0) {
      temp = temp.filter((item) => filters.category.includes(item.category));
    }

    if (filters.sizes.length > 0) {
      temp = temp.filter((item) => filters.sizes.includes(item.size));
    }

    if (filters.ratings) {
      temp = temp.filter(
        (item) => parseFloat(item.ratings || 0) >= filters.ratings
      );
    }

    if (filters.discount) {
      temp = temp.filter((item) => {
        const percent = parseInt(item.discount?.split("%")[0] || 0);
        return percent >= filters.discount;
      });
    }

    if (sortOrder === "highprice") {
      temp.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOrder === "lowprice") {
      temp.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    setFilteredData(temp);
  }, [filters, sortOrder, searchQuery, data]);

  const categoryData = ["T-Shirt", "Shirt", "Joggers", "Hoddies", "Pant"];
  const sizesData = ["XS", "S", "M", "L", "XL"];
  const ratingsData = [
    { label: "4.5 And Above", value: 4.5 },
    { label: "4 And Above", value: 4 },
    { label: "3.5 And Above", value: 3.5 },
    { label: "3 And Above", value: 3 },
    { label: "2.5 And Above", value: 2.5 },
  ];
  const discountData = [
    { label: "20% Or More", value: 20 },
    { label: "30% Or More", value: 30 },
    { label: "40% Or More", value: 40 },
    { label: "50% Or More", value: 50 },
    { label: "60% Or More", value: 60 },
  ];

  return (
    <div className="w-full h-auto pt-4">
      <div className="w-full bg-[#207BB4] text-white font-semibold text-sm text-center h-[5vh] flex justify-center items-center">
        <p>FREE SHIPPING on all orders above ₹399</p>
      </div>

      <div className="w-[95%] md:w-[90%] m-auto mt-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[30%]">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-xl text-[#363537] font-semibold">Filters</h1>
            <button
              onClick={clearAllFilters}
              className="text-base text-[#339D9C] font-medium cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <hr className="mb-4 border-[#D1D5DB]" />

          <FilterSection
            title="Category"
            data={categoryData}
            type="checkbox"
            selected={filters.category}
            onChange={(val) => handleFilterChange("category", val)}
          />
          <FilterSection
            title="Sizes"
            data={sizesData}
            type="checkbox"
            selected={filters.sizes}
            onChange={(val) => handleFilterChange("sizes", val)}
          />
          <FilterSection
            title="Ratings"
            data={ratingsData}
            type="radio"
            selected={filters.ratings}
            onChange={(val) => handleFilterChange("ratings", val)}
          />
          <FilterSection
            title="Discount"
            data={discountData}
            type="radio"
            selected={filters.discount}
            onChange={(val) => handleFilterChange("discount", val)}
          />
        </div>

        <div className="w-full pt-11 md:w-[100%]">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
            <input
              type="text"
              placeholder="Search by name, category, size..."
              className="border px-3 py-2 w-full sm:w-[60%] outline-none"
              value={searchQuery}
              onChange={(e) => updateURLParams("search", e.target.value)}
            />
            <select
              onChange={(e) => updateURLParams("sort", e.target.value)}
              value={sortOrder}
              className="border px-2 py-2 w-full sm:w-[35%] outline-none"
            >
              <option value="">Sort by Price</option>
              <option value="highprice">High to Low</option>
              <option value="lowprice">Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => <Card key={item.id} data={item} />)
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, data, type, selected, onChange }) {
  return (
    <div className="mb-6">
      <div className="flex gap-2 items-center mb-5">
        <div className="w-[5px] h-[5px] rounded-full bg-[#C7CBD4]"></div>
        <h1 className="text-base font-medium">{title}</h1>
      </div>
      {data.map((el, idx) => {
        const value = typeof el === "string" ? el : el.value;
        const label = typeof el === "string" ? el : el.label;
        const isChecked =
          type === "checkbox" ? selected.includes(value) : selected == value;

        return (
          <div className="flex items-center gap-3 mb-3" key={idx}>
            <input
              type={type}
              name={title}
              value={value}
              checked={isChecked}
              onChange={() => onChange(value)}
              className="w-4 h-4 accent-[#207BB4] border border-[#B8B9BF]"
            />
            <span className="text-sm text-[#676767]">{label}</span>
          </div>
        );
      })}
      <hr className="mt-4 border-[#D1D5DB]" />
    </div>
  );
}

export default MenPage;
