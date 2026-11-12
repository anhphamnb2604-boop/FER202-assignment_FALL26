import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
  Edit3,
  Clock,
  Sparkles,
  PlusCircle,
  Search
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CoachPortalSection({
  courses,
  onUpdateCourse,
  enrollments,
  onUpdateEnrollment,
  courtBookings
}) {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('students');
  const [searchStudent, setSearchStudent] = useState('');
  const [editingEnrId, setEditingEnrId] = useState(null);
  const [evalForm, setEvalForm] = useState({
    attendance: '',
    duprEvaluation: '',
    coachFeedback: '',
    status: 'confirmed'
  });

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [syllabusForm, setSyllabusForm] = useState({
    schedule: '',
    summary: '',
    syllabusText: ''
  });

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filteredEnrollments = enrollments.filter(
    (e) =>
      e.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(searchStudent.toLowerCase()) ||
      e.studentPhone.includes(searchStudent)
  );

  const startEditStudent = (enr) => {
    setEditingEnrId(enr.id);
    setEvalForm({
      attendance: enr.attendance || '1/8 buổi',
      duprEvaluation: enr.duprEvaluation || 'DUPR 2.50',
      coachFeedback: enr.coachFeedback || '',
      status: enr.status || 'confirmed'
    });
  };

  const saveStudentEval = (enrId) => {
    onUpdateEnrollment(enrId, evalForm);
    setEditingEnrId(null);
  };

  const startEditSyllabus = (course) => {
    setEditingCourseId(course.id);
    setSyllabusForm({
      schedule: course.schedule,
      summary: course.summary,
      syllabusText: (course.syllabus || []).join('\n')
    });
  };

  const saveSyllabus = (courseId) => {
    const updatedSyllabus = syllabusForm.syllabusText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    onUpdateCourse(courseId, {
      schedule: syllabusForm.schedule,
      summary: syllabusForm.summary,
      syllabus: updatedSyllabus
    });
    setEditingCourseId(null);
  };

  return (
    <div className="py-4 bg-light min-vh-100">
      <div className="container">
        {/* Coach Dedicated Banner */}
        <div
          className="rounded-4 p-4 p-lg-5 mb-4 text-white shadow-sm"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)' }}
        >
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <span className="badge bg-info text-dark fw-bold px-3 py-2 rounded-pill mb-2">
                KÊNH CHUYÊN MÔN HUẤN LUYỆN VIÊN • COACH WORKSPACE
              </span>
              <h2 className="fw-extrabold mb-1">
                Xin chào, {currentUser?.name || 'Huấn Luyện Viên'}!
              </h2>
              <p className="text-white-75 mb-0 small">
                Quản lý lớp dạy, điểm danh chuyên cần, chấm điểm xếp hạng DUPR và cập nhật giáo trình đào tạo cho học viên.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-inline-flex align-items-center gap-3 bg-white bg-opacity-10 p-3 rounded-4">
                <Award size={34} className="text-warning" />
                <div className="text-start">
                  <div className="fw-bold">{currentUser?.level || 'PPR Certified Pro'}</div>
                  <small className="text-white-50">Chứng nhận Đào tạo Quốc tế</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coach KPI Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="text-primary small fw-bold">HỌC VIÊN ĐANG PHỤ TRÁCH</div>
              <div className="fs-3 fw-extrabold text-dark">{enrollments.length} học viên</div>
              <small className="text-secondary">Đang theo học các lớp</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="text-success small fw-bold">CHƯƠNG TRÌNH GIẢNG DẠY</div>
              <div className="fs-3 fw-extrabold text-dark">{courses.length} khóa học</div>
              <small className="text-secondary">Chuẩn giáo trình USAPA</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="text-warning small fw-bold">ĐÃ ĐÁNH GIÁ DUPR</div>
              <div className="fs-3 fw-extrabold text-dark">
                {enrollments.filter((e) => e.duprEvaluation).length}/{enrollments.length}
              </div>
              <small className="text-secondary">Hồ sơ đã có điểm DUPR</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-3 h-100">
              <div className="text-info small fw-bold">CA SÂN TẬP HÔM NAY</div>
              <div className="fs-3 fw-extrabold text-dark">{courtBookings.length} ca tập</div>
              <small className="text-secondary">Lịch hoạt động trên cụm sân</small>
            </div>
          </div>
        </div>

        {/* Coach Navigation Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`btn fw-bold px-4 py-2 rounded-3 d-flex align-items-center gap-2 ${
              activeTab === 'students' ? 'btn-primary shadow-sm' : 'btn-white bg-white border'
            }`}
          >
            <Users size={18} />
            <span>Sổ Điểm Danh & Chấm Trình Độ DUPR ({enrollments.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('syllabus')}
            className={`btn fw-bold px-4 py-2 rounded-3 d-flex align-items-center gap-2 ${
              activeTab === 'syllabus' ? 'btn-primary shadow-sm' : 'btn-white bg-white border'
            }`}
          >
            <BookOpen size={18} />
            <span>Giáo Trình & Lịch Giảng Dạy ({courses.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`btn fw-bold px-4 py-2 rounded-3 d-flex align-items-center gap-2 ${
              activeTab === 'schedule' ? 'btn-primary shadow-sm' : 'btn-white bg-white border'
            }`}
          >
            <Calendar size={18} />
            <span>Lịch Sử Dụng Sân Tập ({courtBookings.length})</span>
          </button>
        </div>

        {/* TAB 1: STUDENT ATTENDANCE & DUPR GRADING */}
        {activeTab === 'students' && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="row g-3 align-items-center justify-content-between mb-3">
              <div className="col-md-6">
                <h5 className="fw-extrabold text-dark mb-1">
                  Bảng Đánh Giá Kỹ Thuật & Điểm Danh Học Viên
                </h5>
                <small className="text-secondary">
                  Cập nhật tiến độ từng buổi học, chấm điểm DUPR và gửi nhận xét trực tiếp vào hồ sơ học viên
                </small>
              </div>
              <div className="col-md-4">
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-light">
                    <Search size={15} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm tên học viên, SĐT hoặc lớp học..."
                    value={searchStudent}
                    onChange={(e) => setSearchStudent(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle small">
                <thead className="table-primary">
                  <tr>
                    <th>Mã HV</th>
                    <th>Thông Tin Học Viên</th>
                    <th>Lớp Đăng Ký & Ca Học</th>
                    <th>Tiến Độ Chuyên Cần</th>
                    <th>Điểm Xếp Hạng DUPR</th>
                    <th>Nhận Xét Kỹ Thuật Của HLV</th>
                    <th>Trạng Thái</th>
                    <th>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.map((enr) => {
                    const isEdit = editingEnrId === enr.id;
                    return (
                      <tr key={enr.id}>
                        <td className="fw-bold">{enr.id}</td>
                        <td>
                          <div className="fw-bold text-dark">{enr.studentName}</div>
                          <div className="text-secondary">{enr.studentPhone}</div>
                          <span className="badge bg-light text-secondary border mt-1">
                            {enr.experienceLevel}
                          </span>
                        </td>
                        <td>
                          <div className="fw-bold text-primary">{enr.courseTitle}</div>
                          <div className="text-secondary">🕒 {enr.preferredSchedule}</div>
                        </td>
                        <td>
                          {isEdit ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={evalForm.attendance}
                              onChange={(e) =>
                                setEvalForm({ ...evalForm, attendance: e.target.value })
                              }
                              placeholder="VD: 6/8 buổi"
                            />
                          ) : (
                            <span className="badge bg-info text-dark px-2 py-1">
                              {enr.attendance || 'Mới nhập học'}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEdit ? (
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={evalForm.duprEvaluation}
                              onChange={(e) =>
                                setEvalForm({ ...evalForm, duprEvaluation: e.target.value })
                              }
                              placeholder="VD: DUPR 3.25"
                            />
                          ) : (
                            <span className="fw-extrabold text-success">
                              {enr.duprEvaluation || 'Chưa chấm điểm'}
                            </span>
                          )}
                        </td>
                        <td style={{ maxWidth: '250px' }}>
                          {isEdit ? (
                            <textarea
                              rows="2"
                              className="form-control form-control-sm"
                              value={evalForm.coachFeedback}
                              onChange={(e) =>
                                setEvalForm({ ...evalForm, coachFeedback: e.target.value })
                              }
                              placeholder="Nhận xét bộ chân, kỹ thuật Dink, Drop..."
                            />
                          ) : (
                            <div className="fst-italic text-dark">
                              "{enr.coachFeedback || enr.notes}"
                            </div>
                          )}
                        </td>
                        <td>
                          {isEdit ? (
                            <select
                              className="form-select form-select-sm"
                              value={evalForm.status}
                              onChange={(e) =>
                                setEvalForm({ ...evalForm, status: e.target.value })
                              }
                            >
                              <option value="confirmed">Đang học</option>
                              <option value="completed">Đã tốt nghiệp</option>
                              <option value="pending">Chờ xếp lớp</option>
                            </select>
                          ) : (
                            <span
                              className={`badge ${
                                enr.status === 'completed'
                                  ? 'bg-primary'
                                  : enr.status === 'confirmed'
                                  ? 'bg-success'
                                  : 'bg-warning text-dark'
                              }`}
                            >
                              {enr.status === 'completed'
                                ? 'Đã tốt nghiệp'
                                : enr.status === 'confirmed'
                                ? 'Đang theo học'
                                : 'Chờ xếp lớp'}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEdit ? (
                            <div className="d-flex flex-column gap-1">
                              <button
                                type="button"
                                onClick={() => saveStudentEval(enr.id)}
                                className="btn btn-sm btn-success fw-bold"
                              >
                                Lưu
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingEnrId(null)}
                                className="btn btn-sm btn-outline-secondary"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEditStudent(enr)}
                              className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                            >
                              <Edit3 size={14} /> Chấm điểm
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SYLLABUS & COURSE TEACHING SCHEDULE */}
        {activeTab === 'syllabus' && (
          <div className="row g-4">
            {courses.map((course) => {
              const isEditCourse = editingCourseId === course.id;
              return (
                <div className="col-lg-6" key={course.id}>
                  <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-primary-subtle text-primary fw-bold mb-1">
                          {course.categoryLabel}
                        </span>
                        <h5 className="fw-extrabold text-dark mb-1">{course.title}</h5>
                        <div className="small text-success fw-semibold">
                          Phụ trách: {course.coach} • Sĩ số: {course.enrolledCount}/{course.maxStudents} HV
                        </div>
                      </div>
                      {!isEditCourse && (
                        <button
                          type="button"
                          onClick={() => startEditSyllabus(course)}
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1"
                        >
                          <Edit3 size={14} /> Sửa Giáo Trình
                        </button>
                      )}
                    </div>

                    {isEditCourse ? (
                      <div className="bg-light p-3 rounded-3 border mt-2">
                        <div className="mb-2">
                          <label className="form-label small fw-bold mb-1">Lịch giảng dạy</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={syllabusForm.schedule}
                            onChange={(e) =>
                              setSyllabusForm({ ...syllabusForm, schedule: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-2">
                          <label className="form-label small fw-bold mb-1">Tóm tắt chuyên môn</label>
                          <textarea
                            rows="2"
                            className="form-control form-control-sm"
                            value={syllabusForm.summary}
                            onChange={(e) =>
                              setSyllabusForm({ ...syllabusForm, summary: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label small fw-bold mb-1">
                            Đề cương từng buổi học (Mỗi dòng 1 giai đoạn)
                          </label>
                          <textarea
                            rows="4"
                            className="form-control form-control-sm"
                            value={syllabusForm.syllabusText}
                            onChange={(e) =>
                              setSyllabusForm({ ...syllabusForm, syllabusText: e.target.value })
                            }
                          />
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            onClick={() => saveSyllabus(course.id)}
                            className="btn btn-sm btn-success fw-bold px-3"
                          >
                            Lưu Giáo Trình
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingCourseId(null)}
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-secondary small mb-2">{course.summary}</p>
                        <div className="small mb-2">
                          <strong>📅 Lịch đứng lớp:</strong> {course.schedule}
                        </div>
                        <div className="bg-light rounded-3 p-3 small">
                          <div className="fw-bold text-dark mb-1">Giáo trình huấn luyện:</div>
                          {(course.syllabus || []).map((step, i) => (
                            <div key={i} className="text-secondary mb-1">
                              • {step}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: COURT SCHEDULE VIEW FOR COACHES */}
        {activeTab === 'schedule' && (
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-extrabold text-dark mb-3">
              Lịch Hoạt Động Các Sân Tập & Thuê Máy Bắn Bóng
            </h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle small">
                <thead className="table-light">
                  <tr>
                    <th>Mã Ca</th>
                    <th>Sân Tập</th>
                    <th>Ngày & Giờ</th>
                    <th>Học Viên / Người Đặt</th>
                    <th>Thiết Bị Hỗ Trợ Huấn Luyện</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {courtBookings.map((cb) => (
                    <tr key={cb.id}>
                      <td className="fw-bold">{cb.id}</td>
                      <td className="fw-bold text-dark">{cb.courtName}</td>
                      <td>
                        <strong>{cb.date}</strong> ({cb.time})
                      </td>
                      <td>
                        {cb.customerName} ({cb.customerPhone})
                      </td>
                      <td>
                        {cb.rentPaddleCount > 0 ? `Thuê ${cb.rentPaddleCount} vợt Carbon` : 'Tự trang bị vợt'}
                        {cb.rentBallMachine ? ' • Có sử dụng Máy bắn bóng Titan Pro' : ''}
                      </td>
                      <td>
                        <span className="badge bg-success">Đã xếp lịch</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
