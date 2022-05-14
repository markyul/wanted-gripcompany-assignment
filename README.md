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
### 화면
1. 초기 화면
<img src="https://user-images.githubusercontent.com/52916848/168438866-af2ab3ff-7b49-4df8-8071-28f478b16dac.png" width="300px"/>

2. 검색 후 화면
<img src="https://user-images.githubusercontent.com/52916848/168438958-2a6c07fa-18bf-4fac-8fa2-e8fb6c90b857.png" width="300px"/>

### 1. Get Movies
- Header에서 검색어 입력

- props로 검색어, page가 필요\
page: 10개 단위로 영화 목록이 들어오기 때문에 page로 구분해서 들고 온다.

- Error 처리\
Response가 string으로 False, True로 오기 때문에 따로 구분할 필요가 있었다.\
Response가 False일 때 Error는 3가지 이상으로 오기 때문에 꼭 필요한 Error만 구분했다.
  1. 검색어가 단순할 경우 너무 많은 결과물이 와서 "Too many results." 라는 Error가 나온다.
  2. 검색어가 잘못 되었을 경우 "Movie not found!" 라는 Error가 나온다.
  3. 나머지는 Server Error로 구분한다.

- 즐겨찾기된 영화는 isBookmark 속성을 true로 만든다.

### 2. 무한 스크롤: intersection observer api 사용
- 영화 목록은 10개씩 추가 된다.
- 다음 페이지가 있다면 계속 스크롤이 늘어난다.
- 로직
  1. 스크롤되는 화면인 Viewport, Viewport에 보이면 스크롤 목록이 추가되게 하는 기준인 Target을 지정한다.
  2. IntersectionObserver를 통해 스크롤을 제어할 Viewport와 Callback 함수를 지정해서 observer를 생성한다.\
    -> `const observer = new IntersectionObserver(handleIntersection, option)`
  3. Callback 함수에서 target에 Viewport에 보였을 때 실행할 것을 정의한다.(보통 목록 추가를 넣음)
  4. option 에서는 Viewport를 지정, target이 얼마나 보였을 때 실행할지 등을 정할 수 있다.

## Bookmark (즐겨찾기)
### 화면
1. 즐겨찾기 Modal
<img src="https://user-images.githubusercontent.com/52916848/168439064-5ab25391-3452-450e-ae62-698e4466e3c3.png" width="300px"/>

2. 즐겨찾기 목록 화면
<img src="https://user-images.githubusercontent.com/52916848/168439124-3a2fe910-8a55-4f38-a723-b40d745d0ded.png" width="300px"/>

### 1. Get Bookmark Movies
- store 라이브러리를 사용해서 저장한 목록을 가져와서 나열한다.

### 2. 즐겨찾기 등록, 해제
- 등록: store 라이브러리를 사용해서 local storage에 즐겨찾기 목록 저장한다.
- 해제: 해제하는 영화 id와 store에 있는 목록을 대조해서 filtering

## 라이브러리
### store
- local storage를 더욱 간단히 사용할 수 있어서 사용한다.
- 기본 내장된 localStorage 라이브러리와 사용법이 같다.
- 즐겨찾기를 로컬에서 저장하기 위해 사용했다.
- 링크: https://www.npmjs.com/package/store

### recoil
- 전역적으로 변수를 관리하기 위해 사용한다.
- useState를 전역으로 사용한다고 생각할 수 있다.
- 즐겨찾기를 등록, 해제했을 때 바로 적용이 된 것을 보여주기 위해 사용했다.
- 즐겨찾기 Modal을 열고 닫거나, 안의 내용을 보여주기 위해 사용했다.
