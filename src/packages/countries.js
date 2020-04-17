const mapForm = `
  <form class="form-horizontal">
    <p>Example: Country-Region DropDown Menu with country flag</p>
      <div class="form-group">
        <label class="col-sm-2 control-label">Country</label>
        <div class="col-sm-10">
          <select class="form-control gds-cr gds-countryflag" country-data-region-id="gds-cr-three"></select>
          <div class="flag"></div>
        </div>
      </div>
      <div class="form-group">
        <label for="gds-cr-three" class="col-sm-2 control-label">Region</label>
        <div class="col-sm-10">
          <select class="form-control" id="gds-cr-three"></select>
        </div>
      </div>
    <input type="submit" value="submit" class="btn btn-primary">
  </form>
`;

const createForm = () => {
  DOMcreate();
};