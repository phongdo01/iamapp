function getCategoriesAtQuote(category_id) {
  $.get(`${url}/categories`, function (data, status) {
    if (status === "error") {
      alert("Error");
      return;
    }
    const selectElement = data.reduce((elements, item) => {
      return (
        elements +
        `
                  <option value="${item._id}" ${
          item._id === category_id ? "selected" : ""
        }>${item.title}</option>
              `
      );
    }, "");
    $("#inlineFormCustomSelect").html(selectElement);
  });
}

function getThemesAtCategory(theme) {
  $.get(`${url}/themes`, function (data, status) {
    if (status === "error") {
      alert("Error");
      return;
    }
    const selectElement = data.reduce((elements, item) => {
      const { _id, background, color, font_name, font_size } = item;
      return (
        elements +
        `
        <option value="${_id}" ${item._id === theme ? "selected" : ""}
              data-content="<image src='${url}/images/${background}' width='10%' height='10%'/> ${color}-${font_name}-${font_size}">
              ${_id}</option>
        `
      );
    }, "");
    $(".selectpicker")
      .selectpicker("refresh")
      .empty()
      .append(selectElement)
      .selectpicker("refresh")
      .trigger("change");
  });
}

function displayQuoteButton(id) {
  if (id === "editQuoteButton") {
    $("#addQuoteButton").css("display", "none");
    $("#editQuoteButton").css("display", "");
  }
  if (id === "addQuoteButton") {
    $("#editQuoteButton").css("display", "none");
    $("#addQuoteButton").css("display", "");
  }
}

function displayCategoryButton(id) {
  if (id === "editCategoryButton") {
    $("#addCategoryButton").css("display", "none");
    $("#editCategoryButton").css("display", "");
  }
  if (id === "addCategoryButton") {
    $("#editCategoryButton").css("display", "none");
    $("#addCategoryButton").css("display", "");
  }
}

function displayGroupButton(id) {
  if (id === "editGroupButton") {
    $("#addGroupButton").css("display", "none");
    $("#editGroupButton").css("display", "");
  }
  if (id === "addGroupButton") {
    $("#editGroupButton").css("display", "none");
    $("#addGroupButton").css("display", "");
  }
}

function displayThemeButton(id) {
  if (id === "editThemeButton") {
    $("#addThemeButton").css("display", "none");
    $("#editThemeButton").css("display", "");
    $("#background-image").css("display", "");
  }
  if (id === "addThemeButton") {
    $("#editThemeButton").css("display", "none");
    $("#addThemeButton").css("display", "");
    $("#background-image").css("display", "none")
  }
}

function getDataQuoteField() {
  const category_id = $("#inlineFormCustomSelect").val();
  const category_name = $("#inlineFormCustomSelect option:selected").text();
  content = $("#content-text").val();
  if (!category_id || !category_name || !content) {
    alert("Please fill all the fields");
    return "EMPTY_FIELD";
  }
  return { category_id, content };
}
function getDataCategoryField() {
  const title = $("#categoryTitle").val();
  const is_lock = $("#categoryIsLock").is(":checked") || false;
  const is_default = $("#categoryIsDefault").is(":checked") || false;
  const theme = $("#categoryTheme").val();
  const body = {
    title,
    is_lock,
    is_default,
    theme,
  };
  if (!(title && theme)) {
    alert("Please fill all the fields");
    return "EMPTY_FIELD";
  }
  return body;
}
function getCategoryAtGroup(listCategoriesInGrp) {
  const groupIds = listCategoriesInGrp ? listCategoriesInGrp.split(","): [];
  $.get(`${url}/categories`, function (data, status) {
    if (status === "error") {
      alert("Error");
      return;
    }
    const selectElement = data.reduce((elements, item) => {
      return (
        elements +
        `
                <option value="${item._id}" ${
          groupIds.includes(item._id) ? "selected" : ""
        }>${item.title}</option>
            `
      );
    }, "");
    $("#selectedCategoryGroup").html(selectElement);
  });
}
function getDataGroupField() {
  const categories = $("#selectedCategoryGroup option:selected")
    .map((i, el) => {
      return $(el).val();
    })
    .get();
  const title = $("#content-text-group").val();
  if (!categories || !title) {
    alert("Please fill all the fields");
    return "EMPTY_FIELD";
  }
  return {categories, title};
}

const handleUpdateError = (error) => {
  if (error.responseJSON.message === 'NO_CHANGE') {
    alert("Please change at least 1 field before updating");
  }
  if (error.responseJSON.message === 'NOT_FOUND') {
    alert("No data match");
  }
}