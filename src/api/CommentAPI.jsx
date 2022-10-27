import { API } from "./LoginAPI";
import axios from "axios";

export const CommentList = async(title) => {
    const data = await axios.post(`${API}/commentlist`, {
      title : title
    });
    return data.data;
};

export const CommentSubmit = async(comment) => {
    const data = await axios.post(`${API}/commentsave`, {
        title : comment.title,
        content : comment.content,
        writer : comment.writer,
        date : comment.date,
        view : comment.view,
        recommend : comment.recommend
    });
    return data.data;
};

export const Comment = async(id) => {
    const data = await axios.post(`${API}/comment`, {
        id : id
    });
    return data.data;
};

export const Formatting = (source, delimiter = '-') => {
    const year = source.getFullYear();
    let month = (source.getMonth() + 1);
    if(parseInt(month) < 10 && parseInt(month) > 0) {
        month = '0' + month;
    }
    let day = (source.getDate());
    if(parseInt(day) < 10 && parseInt(day) > 0) {
        day = '0' + day;
    }
    return [year, month, day].join(delimiter);
}