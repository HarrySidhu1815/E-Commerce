import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e) => {

    if(category.includes(e.target.value)){
      setCategory((prevState) => prevState.filter(item => item != e.target.value))
    } else {
      setCategory(prevState => [...prevState, e.target.value])
    }

  }

  const toggleSubCatgeory = (e) => {

    if(subCategory.includes(e.target.value)){
      setSubCategory((prevState) => prevState.filter(item => item != e.target.value))
    } else {
      setSubCategory(prevState => [...prevState, e.target.value])
    }

  }

  const applyFilters = () => {

    let productsCopy = products.slice()

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase())) 
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter((item) => category.includes(item.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory))
    }

    setFilteredProducts(productsCopy)
  }

  const sortProducts = () => {

    let fpCopy = filteredProducts.slice()

    switch(sortType){

      case 'low-high':
        setFilteredProducts(fpCopy.sort((a,b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilteredProducts(fpCopy.sort((a,b) => (b.price - a.price)))
        break;

      default:
        applyFilters()
        break;
    }
  }

  useEffect(()=> {
    applyFilters()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => {setShowFilter(!showFilter)}} className="my-2 text-xl flex items-center cursor-pointer gap-2"> FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/>
        </p>

        {/* Category Filters */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory}/> Men
            </p>
            <p className=" flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory}/> Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Kids" onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>

          {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCatgeory}/> Topwear
            </p>
            <p className=" flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCatgeory}/> Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Winterwear" onChange={toggleSubCatgeory}/> Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side  */}
          <div className="flex-1">

              <div className="flex justify-between text-base sm:text-2xl mb-4">
                  <Title text1={'ALL'} text2={'COLLECTIONS'} />
                  {/* Product Sort */}
                  <select onChange={(e) => {setSortType(e.target.value)}} className="border-2 border-gray-300 text-sm px2">
                    <option value="relevant">Sort by: Relevant</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                  </select>
              </div>

              {/* Map Product */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

                {filteredProducts.map((item, index) => (
                  <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                  ))}
              </div>
          </div>
    </div>
  );
};

export default Collection;
