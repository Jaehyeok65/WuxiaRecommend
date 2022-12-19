### 무협지 추천 프로젝트


<hr />

<br />


#### Period


##### 2022.10.02 ~ 2022.12.18



<br />


#### Description


##### 무협지를 읽다보니 연재하는 사이트도 많고 작품도 많다보니 재미 있는 작품을 찾기 쉽지 않았으며, 찾았다 하더라도 시간이 지나면 금방 잊어버리곤 했습니다.
##### 따라서 프로젝트를 진행하는 동안 재미있게 읽었으며, 재미있어 보이는 작품을 찾아 리스트에 등록함으로써 추후 읽을 작품을 찾을 때 도움이 될 것 같아 프로젝트를 진행하게 되었습니다. 
###### (본 프로젝트는 배포를 하지 않으며, 상업적 용도가 없기 때문에 저작권 문제는 없을 것이라 판단했습니다.)



<br />
<br />


#### 프로젝트를 진행하며 새롭게 알게된 점
<hr />

useRef 훅을 통해 반환된 객체는 컴포넌트 전 생애주기를 통해 유지되는 독립적인 순수 자바스크립트 객체이므로, useEffect의 deps 영향을 받지 않으며 이를 활용하면 불필요한 리렌더링을 줄일 수 있다는 점을 알게 되었습니다.

실제로 프로젝트를 진행하며 무한스크롤 기능을 구현하기 위해 Intersection Observer API를 사용하여 상태 변화를 감지하는데 있어 callback 함수를 deps에 추가해주니 너무 많은 리렌더링이 일어나 이를 보완할 수 있는 방법이 없을까 찾아보다가 useRef의 이러한 속성을 알게 되었고, 불필요한 리렌더링을 줄일 수 있게 되었습니다.


<br />


#### 기술 스택

<img src="https://img.shields.io/badge/React-BBBA33?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Redux-RGBA27?style=flat-square&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-BBBA27?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-TTAA28?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Styled Components-FF4785?style=flat-square&logo=Storybook&logoColor=white"/>










