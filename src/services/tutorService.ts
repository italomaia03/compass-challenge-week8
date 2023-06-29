import TutorRepository from "../repository/tutorRepository";

class TutorService {
    async get() {
        return await TutorRepository.get();
    }
}

const tutorService = new TutorService();
export default tutorService;
