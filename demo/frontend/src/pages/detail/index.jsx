import React from "react";
import "./index.css"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

const Detail = () => {
  const [value, setValue] = React.useState(5);
  return(
    <div style={{width: "100%"}}>
      <div className="poster">
        <img src={require('../../image/poster.png')} />
        <div className="container-detail-movie">
          <div className="detail-movie">
            <div className="image-movie">
              <img src={require('../../image/meo.jpg')} alt="" />
            </div>
            <div className="content-movie">
              <div className="name-movie">Mèo Đi Hia: Điều Ước Cuối Cùng (2022)</div>
              <div className="genre-movie">Thể loại: Phim Hoạt Hình, Phim Hành Động, Phim Phưu Lưu, Phim Hài, Phim Gia Đình, Phim Giả Tượng</div>
              <div className="date-start">Ngày chiếu: 30/12/2022</div>
              <div className="time">Thời lượng: 1h43m</div>
              <div className="rate-movie">
                Đánh giá: 
                <Box
                  sx={{
                      '& > legend': { mt: 2 }, padding: 0.5, paddingLeft: 2
                  }}
                  >
                      <Rating name="read-only" value={value} readOnly />
                  </Box>
              </div>
              <div className="overview">
                  Overview
                  <p>Puss phát hiện ra rằng niềm đam mê phiêu lưu mạo hiểm của anh đã gây ra hậu quả: Anh đã đốt cháy 8 trong số 9 mạng sống của mình, bây giờ chỉ còn lại đúng một mạng. Anh ta bắt đầu một cuộc hành trình để tìm Điều ước cuối cùng thần thoại trong Rừng Đen nhằm khôi phục lại chín mạng sống của mình. Chỉ còn một mạng sống, đây có lẽ sẽ là cuộc hành trình nguy hiểm nhất của Puss.</p>
      
              </div>
              <div className="div-actor">
                <div className="name-position-actor">
                  <div className="name-actor">Tommy Swerdlow</div>
                  <div className="position">Screenplay, Story</div>
                </div>
                <div className="name-position-actor">
                  <div className="name-actor">Joel Crawford</div>
                  <div className="position">Director</div>
                </div>
                <div className="name-position-actor">
                  <div className="name-actor">Paul Fisher</div>
                  <div className="position">Screenplay</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        abc
      </div>
    </div>
  )
};

export default Detail;
