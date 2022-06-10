# muncShop

화장하기 귀찮은데, <br>
쇼핑할때까지 복잡할 필요는 없잖아요. <br>
<br>
**All in One 색조 화장품 쇼핑몰 [muncShop](https://muncshop.herokuapp.com/).**<br>

<br>
<img width="800px" alt="image" src="https://user-images.githubusercontent.com/96715209/171163820-e513d5ae-e882-42ee-89c2-8d83cc24673f.png">

📌 **시연 영상** : 추가 예정 <br>
📌 **PPT 자료** : 추가 예정

<br>

## 1. [muncShop](https://muncshop.herokuapp.com/) 소개
> 가장 쉽고 편리하게 구매할 수 있는 색조화장품 쇼핑몰

지난 1~2년을 표현할 수 있는 키워드는 '언택트'입니다. <br>
코로나로 인해 온라인 쇼핑 수요는 늘어나고 있지만, 그에 상응하는 공급은 부족합니다. <br>
많은 쇼핑몰이 존재하고 있지만 **비주얼 중심**으로 색조 화장품을 다루는 쇼핑몰이 없다는 것을 발견할 수 있었습니다.  <br>
<br>
이에 저희 팀은 **빠르게 색조화장품군을 비교할 수 있는 쇼핑몰인 [muncShop](https://muncshop.herokuapp.com/)** 을 기획하게 되었습니다.

<br>


🔗  [사이트](https://muncshop.herokuapp.com/)  
🔗  [시연 영상(Youtube)](https://www.youtube.com/watch?v=74VDU7rzv9Y)  

## 🐼 프로젝트 소개

### 👨‍👧‍👧 팀원 소개
- Front-end : 조태현 🔗
- Back-end : 전필호 🔗 
- Design : 조태현

### 👨‍👧‍👧 개발 기간
- 2022년 02월 7일 ~ 04월 07일 (총 8주)

### 👨‍👧‍👧 Front-end 사용 기술 스택
- Javascript ES6
- React, Redux
- HTML5, CSS

### 👨‍👧‍👧 Frontend 사용 패키지
- Redux, Reduxjs/toolkit, redux-thunk, redux-devtools-extension
  - 중첩된 컴포넌트 구조 안에서, 데이터 참조와 상태 관리를 효율적으로 하기 위한 목적
  - 미들웨어로 서버와의 비동기 액션 보다 편하게 다루기 위해 redux-thunk, 개발환경에서 state / action 등 쉽게 추적하고 관리하기 위해 redux-devtools-extension 사용
- Axios
  - 서버와의 HTTP 통신을 위해 사용
- react-bootstrap
  - EventCarousel, Pagination 등 필요한 기능을 위해 사용

#### 👨‍👧‍👧 그 외, 팀 협업을 위해 사용하였습니다.
- 소스 형상 관리 : Git
- 커뮤니케이션 : Discord

### 👨‍👧‍👧 서비스 및 서버 통신 흐름
- 이커머스 프로젝트 경험을 바탕으로 '회원' -> '전시/상품' -> '결제' -> '배송'의 흐름으로 유저 Flow를 기획
  ![image](https://user-images.githubusercontent.com/96715209/172965505-3a794ce3-cc78-44c5-b429-ff1a0114a0f5.png)

- 클라이언트 배포 : heroku
- Redux 패턴으로 서버와 Axios로 통신
  ![image](https://user-images.githubusercontent.com/96715209/172965521-62d0ec10-4a90-4973-b36b-4631d32f8592.png)



### 👨‍👧‍👧 개발 목표
- 사용자 경험 향상
  - UI/UX : 색조 화장품의 특성과 화려함을 한눈에 알 수 있도록 화면 구성
    ![메인화면](https://user-images.githubusercontent.com/96715209/172964743-b596c4f5-b349-4ed2-aba8-527cb08811f1.gif)

  - 반응형웹 적용: 모바일에서도 사용자가 서비스를 이용할 수 있도록 사용자 편의성 향상
    ![모바일로화면줄이기](https://user-images.githubusercontent.com/96715209/172964869-5f1235ea-07fa-4305-bb97-abc06e39e722.gif)
    ![모바일화면스크롤](https://user-images.githubusercontent.com/96715209/172964977-13f60c78-4513-481a-9226-92bfcb4bcfa3.gif)

  - 페이지 이동 시 깜빡거림과 끊김 없는 자연스러운 사용자 경험 제공, 필요한 데이터만 갱신하여 로딩 성능 개선
    - react-router Link / NavLink 사용

- 개발 생산성 향상
  - 유지 보수 고려한, 확장 가능한 개발 환경 구축
