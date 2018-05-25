// import axios from 'axios'

// const createCheck = (path, document, newName) => {
//     const formData = new FormData()
//     formData.append('file', document, newName)
//     formData.append('path', path)
//     return axios.post(`http://localhost:3000/`, formData)
// }

// export default createCheck

// handleSubmit(event) {
//   event.preventDefault();
//   fetch('api/learning', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'Accept': 'application/json'
//       },
//        body: JSON.stringify({
//            topstuff: event.target.topstuff.value,
//            bottomstuff: event.target.bottomstuff.value,
//            pic1: event.target.myimage.value

//        })
//   })
// }

// var formData = new FormData();
// var imagefile = document.querySelector('#file');
// formData.append("image", imagefile.files[0]);
// axios.post('upload_file', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
// })


// WIP
    // const check = new FormData();
    //   check.append('contactPersonName', this.state.contactPersonName)
    //   formData.append("image", imagefile.files[0]);
    //   axios.post('upload_file', check, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //   })

    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    // let check = new FormData();
    // check.append('file',files[0])
    // return axios.post("http://localhost:3000", check, config)