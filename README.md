# Grip Company 기업 과제
## 주제
영화를 검색하고 즐겨찾기로 등록 할 수 있는 React 앱

## 폴더 구조
```
├─assets
│  └─svgs
├─hooks
│  └─worker
├─routes
│  ├─components
│  │  ├─Card
│  │  ├─Header
│  │  └─TabBar
│  └─SearchPage
├─services
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
```

## Tab Bar
검색과 즐겨찾기를 선택할 수 있다.

`<NavLink>`를 이용해 선택된 탭에 강조 표시

## Search Page
### 1. Get Movies
- Header에서 검색어 입력

- props로 검색어, page가 필요\
page: 10개 단위로 영화 목록이 들어오기 때문에 page로 구분해서 들고 온다.

- Error 처리\
Response가 string으로 False, True로 오기 때문에 따로 구분할 필요가 있었다.\
Response가 False일 때 Error는 3가지 이상으로 오기 때문에 꼭 필요한 Error만 구분했다.
  1. 검색어가 단순할 경우 너무 많은 결과물이 와서 "Too many results." 라는 Error가 나옴
  2. 검색어가 잘못 되었을 경우 "Movie not found!" 라는 Error가 나옴
  3. 나머지는 Server Error로 구분

### 2. 무한 스크롤: intersection observer api 사용
- 영화 목록은 10개씩 추가 된다.
- 다음 페이지가 있다면 계속 스크롤이 늘어난다.
- 로직
  1. 스크롤되는 화면인 Viewport, Viewport에 보이면 스크롤 목록이 추가되게 하는 기준인 Target 지정
  2. IntersectionObserver를 통해 스크롤을 제어할 Viewport와 Callback 함수를 지정해서 observer 생성\
    -> `const observer = new IntersectionObserver(handleIntersection, option)`
  3. Callback 함수에서 target에 Viewport에 보였을 때 실행할 것을 정의한다.(보통 목록 추가를 넣음)
  4. option 에서는 Viewport를 지정, target이 얼마나 보였을 때 실행할지 등을 정할 수 있다.
