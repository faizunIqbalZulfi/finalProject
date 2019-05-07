import React from "react";

class Testimage extends React.Component {
  state = {
    files: [],
    imagesPreviewUrls: []
  };

  _handleImageChange = e => {
    e.preventDefault();
    console.log(e.target.files);

    let files = Array.from(e.target.files);

    files.forEach((file, i) => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState(prevState => ({
          files: [...prevState.files, file],
          imagesPreviewUrls: [...prevState.imagesPreviewUrls, reader.result]
        }));
        console.log(this.state.imagesPreviewUrls);
        console.log(this.state.files);
      };

      reader.readAsDataURL(file);
    });
  };

  onDelete = () => {
    console.log("delete");

    // this.setState({
    //   files: this.state.files.splice(i, 1),
    //   imagePreviewUrl: this.state.imagesPreviewUrls.splice(i, 1)
    // });
  };

  render() {
    let { imagesPreviewUrls } = this.state;

    return (
      <div className="constainer">
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileInput => (this.fileInput = fileInput)}
          onChange={this._handleImageChange}
          multiple
        />
        <button
          onClick={() => {
            this.fileInput.click();
          }}
          className="btnImg"
        >
          select
        </button>
        {imagesPreviewUrls.map((imagePreviewUrl, i) => {
          return (
            <div className="image">
              <img className="gambar" key={i} src={imagePreviewUrl} />
              <button
                onClick={() => {
                  this.onDelete();
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Testimage;
