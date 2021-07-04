import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import img_banner from '../../assets/icons/img_banner.png'
import img_banner2 from '../../assets/icons/Banner_02.png'
import img_banner3 from '../../assets/icons/Banner_03.png'
HomePage.propTypes = {

};

function HomePage(props) {
    return (
        <div>
            <div className="ht-main d-flex flex-row align-items-center">
                <Carousel indicators={false} controls={true} interval={2000}>
                    <Carousel.Item>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center carousel-left">
                                <h1>Nền tảng Trí tuệ nhân tạo toàn diện, tạo đột phá cho quy trình doanh nghiệp</h1>
                                <p>Trí tuệ nhân tạo (AI) đang dần hiện hữu ở mọi lĩnh vực trong cuộc sống của con người. Không thể phủ nhận sự bùng nổ với nhiều đột phá của AI ở thời điểm hiện tại và là AI một trong vấn đề trọng yếu cho doanh nghiệp của bạn.</p>
                            </div>
                            <div className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end align-items-center carousel-right">
                                <img
                                    className="ht-main-img"
                                    src={img_banner}
                                    alt="First slide"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center carousel-left">
                                <h1>Tăng tốc quy trình xử lý dữ liệu cùng giải pháp tự động hóa với chi phí tối ưu</h1>
                                <p>
                                    Giúp tăng tốc quy trình kinh doanh, giảm bớt tác vụ thủ công, tiết kiệm chi phí và tạo ra trải nghiệm khách hàng độc đáo. Tạo sức mạnh cộng hưởng từ việc ứng dụng các giải pháp AI, doanh nghiệp có cơ hội tăng trưởng đột phá.
                                </p>
                            </div>
                            <div className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end align-items-center carousel-right">
                                <img
                                    className="ht-main-img"
                                    src={img_banner2}
                                    alt="First slide"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center carousel-left">
                                <h1>Hỗ trợ nguồn lực bao gồm các chuyên gia trong và ngoài nước để xây dựng nền tảng AI vững mạnh</h1>
                                <p>Trí tuệ nhân tạo (AI) đang dần hiện hữu ở mọi lĩnh vực trong cuộc sống của con người. Không thể phủ nhận sự bùng nổ với nhiều đột phá của AI ở thời điểm hiện tại và là AI một trong vấn đề trọng yếu cho doanh nghiệp của bạn.</p>
                            </div>
                            <div className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end align-items-center carousel-right">
                                <img
                                    className="ht-main-img"
                                    src={img_banner3}
                                    alt="First slide"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
            
            {/* 3-4 Khoá học nôỉ bật trong tuần */}
            
            {/* 10 Khoá học được xem nhiều nhất */}

            {/* 10 Khoá học mới nhất */}

            {/* Lĩnh vực được đăng ký học nhiều nhất */}

        </div>
    );
}

export default HomePage;