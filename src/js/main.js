const main = () => {
    let baseURL = "https://www.themealdb.com";
    var owl = $("#section-category-carousel");
    $(".js-selection-category").change(function(){
        $(".img-loader-wrapper").removeClass("d-none");
        var keyword = $(".js-selection-category option:selected").val();
        $(".section-list-meal").html("");
        $.get(`${baseURL}/api/json/v1/1/filter.php?c=${keyword}`,function(data){
            $(".img-loader-wrapper").addClass("d-none");
            data.meals.forEach(item => {
                $(".section-list-meal").append(
                    `<tr>
                    <th class="id-meal">${item.idMeal}</th>
                    <td class="name-meal">${item.strMeal}</td>
                    <td><img class="img-meal" src="${item.strMealThumb}"/></td>
                    <td class="price-meal">100</td>
                    <td><button class="btn btn-add-meal">Add</button></td>
                    </tr>
                    `)
                });
            });
        });
        
        $(".section-list-meal").on('click',".btn-add-meal",function(e){
            const idmeal =$(this).closest("tr").find(".img-meal").attr("src");
            const meal = {
                id : $(this).closest("tr").children('.id-meal').text(),
                name : $(this).closest("tr").children(".name-meal").text(),
                price : $(this).closest("tr").children(".price-meal").text(),
                thumb : $(this).closest("tr").find(".img-meal").attr("src")
            }
            
            $(".section-basket-table").prepend(`
            <tr class="meal-list-added">
            <th scope="col">${meal.id}</th>
            <th scope="col">${meal.name}</th>
            <th scope="col"><div class="input-group mb-3">
            <input type="text" class="form-control input-meal">
            <div class="input-group-append">
            <span class="input-group-text btn-enter">&#8629;</span>
            </div>
            </div>
            <th scope="col" class="price">${meal.price}</th>
            <th scope="col" class="total-price"></th>
            <th scope="col"><img class="img-meal" src="${meal.thumb}"/></th>
            <th scope="col"><button class="btn btn-delete-meal">Delete</button></th>
            </tr>
            `);
        });
        var valuesum = 0;
        $(".section-basket-table").on('keyup','.input-meal',function(e){
            if(e.which == 13){
                let price = $(this).closest(".input-meal").val() * $(this).closest("tr").children(".price").text();
                $(this).closest("tr").children(".total-price").text(`Rp. ${price}`);
            }
        });
        $(".btn-sum").click(function(){
            $(this).closest("tr").siblings("tr").children(".total-price").each(function(){
                var totalprice = $(this).text().replace( /^\D+/g, '');
                if(!isNaN(totalprice) && totalprice.length !== 0 ){
                    valuesum += parseInt(totalprice);
                    console.log(valuesum);
                }
                $(".total-price-all").text(valuesum);
            });
            
        });
        $("body").on('click','.btn-delete-meal',function(){
            var valuemin = $(this).closest("tr").children(".total-price").text().replace( /^\D+/g, '');
            valuesum -= valuemin;
            $(".total-price-all").text(valuesum);
            $(this).closest("tr").remove();
        })
        $('.btn-reset').click(function(){
            $('.section-basket-table').children().not(".section-basket-total-price").remove();
            valuesum = 0;
            $(".total-price-all").text(valuesum);
            
        });
        
        const getMealCategory = async () => {
            try{
                const response = await fetch(`${baseURL}/api/json/v1/1/categories.php`);
                const responseJSON = await response.json();
                if(responseJSON.error){
                    alert("error");
                }else{
                    renderMealCategory(responseJSON);
                }
            }catch(error){
                alert(error);
            }
        }
        
        function renderMealThumbCategories(thumbCategories){
            let mealCategory = $(".section-category-carousel");
            thumbCategories.meals.forEach(category => {
                $("#section-category-carousel").append(`
                <div class="item"><img src="${category.strMealThumb}"/></div>
                `);
            });
        }
        
        function renderMealCategory(categories){
            const mealCategory = $('.js-selection-category');

            categories.categories.forEach(category => {
                mealCategory.append( `
                <option value="${category.strCategory}">${category.strCategory}</option>
                `);
            });
        }
        getMealCategory();
}
export default main;
   