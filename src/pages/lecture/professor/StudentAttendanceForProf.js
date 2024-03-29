/* 교수의 '출결 및 성적 관리' */
import { motion } from "framer-motion"
import PagingBar from "../../../components/common/PagingBar";
import CommonCSS from '../../../css/common/Common.module.css';
import SearchBarCss from "../../../css/common/SearchBar.module.css";
import SearchBar from "../../../components/common/SearchBar";
import LectureCSS from '../../../css/ProfessorLecture.module.css';
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLecNameMyLecture, callSearchName } from "../../../apis/LectureAPICalls";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import GradeModal from "../../../components/modal/GradeModal";
import { useNavigate } from "react-router";

function StudentAttendanceForProf() {


  const dispatch = useDispatch();
  const type = "studentAttendance";
  const [currentPage, setCurrentPage] = useState(1);
  const [gradeModal, setGradeModal] = useState(false);
  const { lecName, searchName } = useSelector(state => state.SubjectInfoReducer);
  const [params] = useSearchParams();
  const condition = params.get('condition');
  const name = params.get('search');
  const [selectedLecCode, setSelectedLecCode] = useState(0);
  const [selectedLecName, setSelectedLecName] = useState('');
  const navigate = useNavigate();
  const options = [
    { value: "sbjName", label: "과목명" },
    { value: "lecName", label: "강의명" }
  ];
  const clickAttendanceHandler = (lecture) => {

    navigate(`/lecture-student-prof/${lecture.lecCode}`); //출석

  }
  useEffect(
    () => {
      if (name) {
        dispatch(callSearchName({ search: name, condition: condition, currentPage: currentPage }));
        return;
      }
      dispatch(callLecNameMyLecture(currentPage))
    },
    [currentPage, name, condition]
  )

  /* '성적' 버튼을 클릭 시, 실행되는 함수 */
  const clickGradeHandler = (lecture) => {
    setSelectedLecCode(lecture.lecCode);
    setSelectedLecName(lecture.lecName);
    setGradeModal(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
    >
      {gradeModal ? <GradeModal setGradeModal={setGradeModal} lecCode={selectedLecCode} lecName={selectedLecName} /> : null}
      <div className={LectureCSS.container}>
        <div>
          <p className={CommonCSS.pageDirection}>강의관리 ▸ 출결 및 성적관리</p>
        </div>
      </div>
      <div className={LectureCSS.SubjectList}>
        <div className={SearchBarCss.basic}>
          {<SearchBar options={options} type={type} />}
        </div>
        <table className={LectureCSS.SubjectListTable}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="30%" />
            <col width="10%" />
            <col width="10%" />
            <col width="5%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <th>No</th>
              <th>강의번호</th>
              <th>과목명</th>
              <th>강의명</th>
              <th>강의시작일</th>
              <th>강의종료일</th>
              <th>출결</th>
              <th>성적</th>
            </tr>
          </thead>
          <tbody>
            {
              (searchName && searchName.data) ? (
                searchName.data.map((lecture, index) => (
                  <tr key={lecture.lecCode}>
                    <td>{index + 1}</td>
                    <td>{lecture.lecCode}</td>
                    <td>{lecture.subject.sbjName}</td>
                    <td>{lecture.lecName}</td>
                    <td>{lecture.lecStartDate}</td>
                    <td>{lecture.lecEndDate}</td>
                    <td><button className={LectureCSS.button} onClick={() => clickAttendanceHandler(lecture)}>출결</button></td>
                    <td><button className={LectureCSS.button} onClick={() => clickGradeHandler(lecture)}>성적</button></td>

                  </tr>
                ))
              ) : (
                (lecName && lecName.data) && (
                  lecName.data.map((lecture, index) => (
                    <tr key={lecture.lecCode}>
                      <td>{index + 1}</td>
                      <td>{lecture.lecCode}</td>
                      <td>{lecture.subject.sbjName}</td>
                      <td>{lecture.lecName}</td>
                      <td>{lecture.lecStartDate}</td>
                      <td>{lecture.lecEndDate}</td>
                      <td><button className={LectureCSS.button} onClick={() => clickAttendanceHandler(lecture)}>출결</button></td>
                      <td><button className={LectureCSS.button} onClick={() => clickGradeHandler(lecture)}>성적</button></td>
                    </tr>
                  ))
                )
              )
            }
          </tbody>
        </table>
        <div>
          {(searchName && searchName.pageInfo) ? (<PagingBar pageInfo={searchName.pageInfo} setCurrentPage={setCurrentPage} />)
            : (lecName && lecName.pageInfo) ? (<PagingBar pageInfo={lecName.pageInfo} setCurrentPage={setCurrentPage} />)
              : null}
        </div>

      </div>
    </motion.div>
  );
}

export default StudentAttendanceForProf;