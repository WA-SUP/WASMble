# WASMble

<div align="center">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/assemblyscript-007AAC?style=for-the-badge&logo=assemblyscript&logoColor=black">
<img src="https://img.shields.io/badge/webassembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=black">
<img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js&logoColor=white">
<br>
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=black">
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black">
<img src="https://img.shields.io/badge/tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black">
<img src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=black">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=black">
<img src="https://img.shields.io/badge/aws elastic beanstalk-e88c0c?style=for-the-badge&logo=&logoColor=black">

</div>

### WASMble은 자바스크립트 코드와 동일한 코드로 컴파일된 웹 어셈블리 모듈 간 성능 차이를 시각화한 웹 어플리케이션입니다.

| ![image](https://github.com/user-attachments/assets/db008aef-5787-4dc6-bc9f-dcda339caa25)                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 화면 왼쪽의 코드에디터에 자바스크립트 코드로 만든 함수를 입력하면 화면 오른쪽에서 해당 코드로 구성된 웹어셈블리 모듈과의 성능 비교 결과를 확인할 수 있습니다. |

# 내비게이션

- [1. 아이디어](#1-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4)

- [2. 구현을 위한 기술 선정](#2-%EA%B5%AC%ED%98%84%EC%9D%84-%EC%9C%84%ED%95%9C-%EA%B8%B0%EC%88%A0-%EC%84%A0%EC%A0%95)

  - [2-1. 자바스크립트 코드로 웹어셈블리 모듈을 만들어보자.](#2-1-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%93%9C%EB%A1%9C-%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC-%EB%AA%A8%EB%93%88%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90)
  - [2-2. 자바스크립트를 어셈블리스크립트로, 어셈블리스크립트를 웹어셈블리로](#2-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EB%A1%9C)
  - [2-3. 가상환경으로 안전하게 입력된 코드를 실행하는 방법](#2-3-%EA%B0%80%EC%83%81%ED%99%98%EA%B2%BD%EC%9C%BC%EB%A1%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EC%9E%85%EB%A0%A5%EB%90%9C-%EC%BD%94%EB%93%9C%EB%A5%BC-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  - [2-4. 직관적으로 성능을 비교하려면?](#2-4-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%84%B1%EB%8A%A5%EC%9D%84-%EB%B9%84%EA%B5%90%ED%95%98%EB%A0%A4%EB%A9%B4)
  - [2-5. SSR방식으로 성능 비교 결과 공유하기](#2-5-ssr%EB%B0%A9%EC%8B%9D%EC%9C%BC%EB%A1%9C-%EC%84%B1%EB%8A%A5-%EB%B9%84%EA%B5%90-%EA%B2%B0%EA%B3%BC-%EA%B3%B5%EC%9C%A0%ED%95%98%EA%B8%B0)
  - [2-6. 결과 공유를 위한 PostgreSQL기반 데이터 저장 방법](#2-6-%EA%B2%B0%EA%B3%BC-%EA%B3%B5%EC%9C%A0%EB%A5%BC-%EC%9C%84%ED%95%9C-postgresql%EA%B8%B0%EB%B0%98-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%80%EC%9E%A5-%EB%B0%A9%EB%B2%95)

- [3. 기술 챌린지](#3-%EA%B8%B0%EC%88%A0-%EC%B1%8C%EB%A6%B0%EC%A7%80)

- [4. 팀원 소개](#4-%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C)

# 1. 아이디어

성능 좋은 웹사이트를 만드는 것은 단순히 기술적인 영역을 넘어 사용자 경험을 크게 향상시킬 수 있는 중요한 요소라고 생각합니다.

WASMble은 웹페이지의 성능을 극대화하고, 더 빠르고 효율적인 실행 환경을 제공하는 도구를 만들고 싶다는 아이디어에서 시작되었습니다.

웹어셈블리(WASM)는 브라우저 내에서 네이티브 성능에 가까운 속도로 실행될 수 있는 기술로, 특히 복잡한 연산이나 대량의 데이터를 처리할 때 자바스크립트보다 훨씬 빠르게 실행됩니다.
웹에서의 속도는 사용자 경험에 큰 영향을 미치는데, 특히 반응 속도나 페이지 로딩 시간을 줄여 더 빠른 상호작용이 가능하게 됩니다.

이러한 웹어셈블리의 장점을 활용해 자바스크립트코드가 웹어셈블리로 변환될 때 성능이 얼마나 향상될 수 있는지 직접적으로 보여주는 도구를 구현해 보고자 했습니다.

이를 통해 단순히 코드를 최적화하는 것을 넘어, 개발자에게는 웹 성능을 극대화할 수 있는 새로운 방법에 대한 관점을 확장해주고, 사용자에게는 쾌적한 성능으로 인한 더 좋은 만족감을 제공해줄 수 있을거라 기대하며 제작해보았습니다.

# 2. 구현을 위한 기술 선정

#### 2-1. 자바스크립트 코드로 웹어셈블리 모듈을 만들어보자.

보통 C나 C++로부터 모듈화하는 웹어셈블리를 웹 개발에 익숙한 자바스크립트코드로 생성할 수 있을까 하는 아이디어에서 시작해 웹어셈블리 생성이 가능한 언어 중 어셈블리스크립트도 있다는 것을 알게 되었고, 이를 통해 자바스크립트코드에서 어셈블리스크립트를 거쳐 웹어셈블리를 생성하여 성능을 비교하여 시각화해보고자 했습니다.

<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> →
<img src="https://img.shields.io/badge/assemblyscript-007AAC?style=for-the-badge&logo=assemblyscript&logoColor=black"> →
<img src="https://img.shields.io/badge/webassembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=black">

대량의 데이터를 다루기 전, 구현이 가능한지 확인해보고자 먼저 간단한 알고리즘함수를 변환해보는 작업부터 시작했습니다.

#### 2-2. 자바스크립트를 어셈블리스크립트로, 어셈블리스크립트를 웹어셈블리로

타입스크립트를 기반으로 만들어진 언어인 어셈블리스크립트는 타입스크립트처럼 자바스크립트와 동일한 코드 구조에서 타입추론이 부여되어 있는 형태로 작성됩니다. 따라서 자바스크립트 코드를 추상구문트리로 변환하여 변수, 반환값 등 타입 추론이 필요한 부분에 타입을 적어넣어 생성할 수 있도록 코드를 작성했습니다.

그리고 어셈블리스크립트의 내장 컴파일러에 있는 웹어셈블리 빌드 기능으로 웹어셈블리 모듈을 생성하였습니다.
해당 기능은 cli로 구현이 가능했습니다.

```
npx asc ${어셈블리스크립트 코드 위치} --outFile ${웹어셈블리 모듈 생성위치} --optimize
```

#### 2-3. 가상환경으로 안전하게 입력된 코드를 실행하는 방법

유저가 입력하는 코드를 당연히 이상적으로 자바스크립트 함수로 잘 작성할 것이라고 가정한다면 가장 좋겠지만, 무엇이 입력되든 실행하게 되므로 안전하게 입력값을 다룰 필요가 있다고 생각했습니다.

> 만에 하나 XSS 등의 경우가 발생한다면 프로젝트 애플리케이션이 위험해질수도 있으니까요.

따라서 무한루프를 발생시키거나, 에러를 발생시키는 경우 핸들링 할 수 있는 로직을 고려하여 isolated-vm 라이브러리로 생성한 가상환경과 docker 컨테이너를 활용하여 이중으로 실행환경을 관리했습니다.

로직을 특정 컨텍스트에서 실행하고, 의도한대로 작동되지 않는 경우 해당 컨텍스트를 삭제하는 방식으로 로직의 안정성을 추구했습니다.

#### 2-4. 직관적으로 성능을 비교하려면?

모듈이 만들어지고 실행할 수 있는 환경을 만드는만큼 성능지표와 비교방식을 어떻게 표현하는가도 꽤 많은 고민이 되었습니다.

초기 기획상 대용량 데이터를 아직 다루지 않았고, 실제 모듈보다 간단한 알고리즘 함수를 대상으로 작업하고 있었기 때문에 자바스크립트 코드든 웹어셈블리 모듈이든 실행 시간이 약 0.0007ms로 매우 짧게 측정되었고, 이처럼 짧은 시간 차이는 사용자에게 크게 와닿지 않을거라 판단되어, 어떻게 하면 이 작은 차이를 사용자 입장에서 더 명확하게 보여줄 수 있을지 고민하게 되었습니다.

먼저는 1번의 실행결과만으로 비교하는건 표본이 적다고 생각되어 10번의 실행결과의 평균 실행속도로 비교해보려했는데, 예상외로 1번째 함수실행의 내용이 크롬브라우저의 v8엔진에 결과값이 캐싱이 되어 1회 이후의 결과는 캐싱된 결과가 출력되어 결과가 정확하지 않았습니다.

이를 해결하기 위해 다양한 방법을 조사하던 중, 과거에 많은 사람들이 사용하던 [jsPerf](https://jsperf.app/)라는 사이트에서 사용하던 성능 분석 방식을 발견했습니다. 이 방식은 1초 동안 해당 로직을 연속 실행하여 몇 번 실행되는지를 기준으로 성능을 비교하는 방법이었고, 짧은 시간 차이를 보다 명확하게 보여줄 수 있는 방법으로 적합하다고 판단했습니다.

![image](https://github.com/user-attachments/assets/4897e79c-8527-4bfb-942b-3c283c71e4c8)
막대차트를 통해 1초당 실행횟수의 차이를 시각적으로 한 번 표시해주고, 추가로 이 실행횟수의 차이를 숫자로 한 번 더 표시해주어 조금 더 직관적으로 인식할 수 있도록 결과 리포트를 구성했습니다.

#### 2-5. SSR방식으로 성능 비교 결과 공유하기

성능 비교 결과를 사용자 뿐만 아니라 다른 사람과도 쉽게 공유할 수 있으면 더 유용할 것이라는 생각에서 출발했습니다. 성능 비교 결과를 간단하게 링크나 이미지처럼 공유할 수 있으면, 개발자들끼리 성능 차이에 대해 더 깊이 있는 논의를 할 수 있고, 여러 가지 사용 사례에서 결과를 참고하기도 용이할거라 판단했습니다.

이 과정에서 레퍼런스를 얻은 곳은 [GitHub Gist](https://gist.github.com/)입니다. Gist는 간단하게 코드를 공유하는 서비스로, 이 방식을 착안하여 성능 비교 결과를 간편하게 공유할 수 있는 방식을 구상했고, SSR(Server-Side Rendering) 방식으로 HTML을 생성해, 이를 정적 블럭 형태로 공유할 수 있도록 했습니다.

| ![csr](https://github.com/user-attachments/assets/4683c0c3-4a65-4c7a-be7c-7846bb2baa60) | ![SSR](https://github.com/user-attachments/assets/a1f0a2a2-9c0c-4779-bd99-aaba9da0de9c) |
| --------------- | --------------- |
| **[CSR]**       | **[SSR]**       |

SSR 방식을 사용한 이유는 성능 비교 결과가 정적 페이지 형태로 제공되어, 클라이언트 측에서 추가 로딩이 필요 없이 즉각적으로 표시될 수 있기 때문입니다. 이를 통해 사용자에게 빠르고 원활한 결과 화면을 제공할 수 있으며, 공유된 링크나 HTML 블럭을 어디서든 동일한 결과를 쉽게 확인할 수 있는 장점이 있습니다.

하지만 React로만 구현할 경우 클라이언트 사이드에서만 렌더링이 이루어져, SSR 방식으로 제공하는데 한계가 있었습니다. 이를 해결하기 위해 조사하던 중 [React Server Components](https://ko.react.dev/reference/rsc/server-components)에 대해 알게 되었는데, 가장 적절한 방법이라는 생각이 들었습니다. React Server Components는 서버에서 먼저 일부 컴포넌트를 렌더링하여 클라이언트로 전송하고, 클라이언트는 그 데이터를 받아 필요한 부분만 렌더링을 완료하는 방식입니다.

이 기능을 구현하는 데에는 Next.js 14버전이 적합하다고 판단했습니다. Next.js 14는 React Server Components와의 완벽한 통합을 제공하며, SSR뿐만 아니라 데이터 패칭 최적화와 빌드 효율성도 크게 개선되어 이를 통해 성능 비교 결과를 보다 효율적으로 렌더링하고, 다른 사용자와 쉽게 공유할 수 있는 시스템을 구축할 수 있었습니다.

#### 2-6. 결과 공유를 위한 PostgreSQL기반 데이터 저장 방법

성능 비교 결과를 다른 사람과 쉽게 공유하기 위해서는 데이터를 안전하고 빠르게 저장할 필요가 있었습니다. 복잡한 설정 없이 가볍고 신뢰성있는 방법을 찾다가, Supabase와 Prisma를 선택하게 되었습니다. Supabase는 Postgres 기반 서버리스 백엔드로, 실시간 데이터 저장 및 조회 기능을 제공해 성능 비교 결과를 즉시 저장하고, UUID 기반 고유 링크로 공유할 수 있게 해줍니다.

Supabase의 RESTful API 자동 생성 기능이 있어 복잡한 API를 별도로 설계할 필요 없이 빠르게 시스템을 구축할 수 있었고, Prisma는 타입 안전성과 간단한 쿼리 작성을 통해 안전하고 유연한 데이터 관리를 가능하게 했습니다. 이 결합 덕분에 성능 비교 결과를 신속하게 저장하고, "measurement-result/{UUID}" 형식의 링크로 쉽게 공유할 수 있는 최적의 솔루션을 제공할 수 있었습니다.

결과적으로 Supabase와 Prisma의 조합으로 사용자 경험을 향상시키는 안전하고 확장 가능한 성능 비교 결과 공유 시스템을 구축할 수 있었습니다.

# 3. 기술 챌린지

### 3-1. 모든 자바스크립트 자료형을 어셈블리스크립트로 변환할 수 있을까?

답은 **그렇지 않다**입니다.

어셈블리스크립트의 문법은 타입스크립트와 유사하여 처음에는 두 언어를 비슷하게 이해하고 접근할 수 있습니다. 하지만 사실 이 두 언어는 문법적으로만 비슷할 뿐, **다른 언어**입니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/41ef9c4c-53b7-4e04-a455-49dd831b4326" width="300rem"/>

</div>

타입스크립트는 자바스크립트의 상위 집합으로, 자바스크립트로 컴파일되기 때문에 모든 자바스크립트 코드를 타입스크립트로 표현할 수 있습니다. 반면, 어셈블리스크립트는 웹어셈블리로 컴파일되며, 웹어셈블리는 정적 타입 정보에 크게 의존합니다.

그렇다면 어떤 자료형을 어셈블리스크립트로 변환할 수 있을까요?

이 질문에 답하기 위해 자바스크립트에서는 가능하지만 어셈블리스크립트에서 지원하지 않는 타입을 조사하였습니다.

- bigInt
- 숫자, 문자열 등이 혼재되어 있는 배열
- 객체 리터럴

그리고 어셈블리스크립트로 변환이 가능한 자료형을 정리해봤습니다.

- 2^53-1의 숫자(Float 64로 표현 가능한 최댓값)
- 숫자 또는 문자열로만 구성된 배열
- Map, Class 객체

여기서 배열, 객체 등의 참조값을 지원하려면 웹어셈블리에 할당된 메모리에 `importObject`를 전달해야 하는데요. 이때 참조값의 메모리 주소를 전달해야 하는데, 가비지 컬렉터를 사용하는 자바스크립트에서는 메모리 주소값을 전달하는 방법을 찾지 못하여 결론적으로 **원시값** 자료형만 지원하게 되었습니다.

비록 현재는 원시값만 지원하고 있지만 객체 리터럴을 Map 또는 Class로 변환하거나 `importObject`에 참조값의 메모리 주소를 전달하는 방법 등을 더 조사하여 개선해나갈 예정입니다.

### 3-2. 매 요청시 서버에 파일을 생성 -> 삭제하는게 올바른 방향일까?

클라이언트에서 성능 비교 요청을 하게되면. 유저의 자바스크립트 코드를 변환하는 과정에서 어셈블리스크립트 파일과 웹어셈블리 파일을 생성하고, 성능을 비교한 뒤 해당 파일들을 삭제하게 됩니다.

이러한 로직이 개발단계에선 문제가 없었지만 **프로젝트를 배포하고 많은 사용자가 이용하게 될 경우 서버에 부담이 되지 않을까?** 하는 의구심에 조사를 하게 되었습니다.

매 요청 시 서버에서 파일을 생성하고 삭제하는 로직은 두 가지 위험성을 내포하고 있습니다.

1. **동시성 문제**: 다수의 사용자가 동시에 요청할 경우, 같은 파일에 대해 여러 요청이 동시에 처리되면서 충돌이나 데이터 손상이 발생할 수 있습니다. 이로 인해 파일이 제대로 생성되거나 삭제되지 않거나, 다른 사용자의 파일에 의도치 않게 접근하는 문제가 발생할 수 있습니다.

2. **I/O 작업 부하**: 매 요청마다 파일을 생성하고 삭제하는 것은 디스크 I/O를 과도하게 사용하게 되어 서버 성능에 부정적인 영향을 미칠 수 있습니다. 특히 빈번한 요청이 있을 경우, 파일 시스템의 처리 용량을 초과하게 되어 성능 저하나 응답 시간 지연이 발생할 수 있습니다.

팀원과의 회의 끝에 어셈블리스크립트 Compiler를 사용하여 파일을 생성하지 않고 웹어셈블리를 생성하는 방식으로 로직의 흐름을 바꾸었는데요. 이 과정에서 문제가 발생하였습니다.

어셈블리스크립트 Compiler는 내부적으로 `binaryen`을 사용하여 웹어셈블리로 컴파일 합니다. 이를 import 하는 과정에서 알 수 없는 타입 에러가 발생하였고, webpack을 통해 번들된 코드에서 문제가 발생하는것은 파악하였지만 정확한 원인과 해결책을 찾지 못하였습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/75034186-7b55-4b22-8a53-c170f9b391ab" width="500rem"/>

_알 수 없는 타입 에러_

</div>

약 이틀간 문제를 해결하기 위해 노력하였지만 프로젝트의 남은 기간을 고려하여 결과적으로 서버에서 파일을 생성하고 삭제하지만 `tmp`모듈을 사용하여 서버 안정성을 확보하는 방향으로 프로젝트를 구현하였습니다.



# 4. 팀원 소개

배종범 https://github.com/jongbaaam <br>
정의성 https://github.com/allansad <br>
이창희 https://github.com/heestolee
