import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import getCompanies_jhm from './src/routes/getCompanies_jhm.js';
import getUsers_jhm from './src/routes/getUsers_jhm.js';
import getLatestSelections_jhm from './src/routes/getLatestSelections_jhm.js';
import patchUser_jhm from './src/routes/patchUser_jhm.js';
import patchCompany_jhm from './src/routes/patchCompany_jhm.js';
import getCompanyRank_jhm from './src/routes/getCompanyRank_jhm.js';
import getCompanyDetail_kjy from './src/routes/getCompanyDetail_kjy.js';
import getInvesterList_kjy from './src/routes/getInvesterList_kjy.js';

dotenv.config();
export const app = express();
// 모든 url에 대해 cors설정
app.use(cors());
// 앱 전체에서 express.json()을 사용하겠다는 의미
app.use(express.json());
// req의 content-type이 application/json이면 이를 parsing해서 req body에 js객체로 담아줌)
app.use(bodyParser.json());

/**
 * API 라우터(/src/routes에 작성한 API파일을 이곳에 연결)
 * - 각자 만든 라우터 파일명의 끝에 _이니셜을 추가(ex: getCompanies_jhm)
 * - 각자의 이니셜을 엔드포인트 주소에 추가(ex: /api/jhm)
 * - 프론트엔드에서도 각자의 이니셜을 포함한 주소로 요청해야함(axios로 요청할 때의 주소)
 */
// 전체 기업 목록 조회(조형민)
app.use('/api/jhm', getCompanies_jhm);
// 전체 사용자 목록 조회(조형민)
app.use('/api/jhm', getUsers_jhm);
// 특정 사용자의 최근 선택 기업 목록 조회(조형민)
app.use('/api/jhm', getLatestSelections_jhm);
// 사용자 정보 수정하기(조형민)
app.use('/api/jhm', patchUser_jhm);
// 기업 정보 수정하기(조형민)
app.use('/api/jhm', patchCompany_jhm);
// 기업 순위 조회하기(조형민)
app.use('/api/jhm', getCompanyRank_jhm);

// 기업 상세 정보 조회(김주영)
app.use('/api/kjy', getCompanyDetail_kjy);
// 해당 기업에 투자한 투자자 목록 조회(김주영)
app.use('/api/kjy', getInvesterList_kjy);

app.listen(process.env.PORT || 5500, () => console.log('Server Started'));
