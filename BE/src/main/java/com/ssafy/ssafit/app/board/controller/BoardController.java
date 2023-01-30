package com.ssafy.ssafit.app.board.controller;

import com.ssafy.ssafit.app.board.dto.req.BoardReqDto;
import com.ssafy.ssafit.app.board.dto.resp.BoardRespDto;
import com.ssafy.ssafit.app.board.service.BoardService;
import com.ssafy.ssafit.app.common.CommonResp;
import com.ssafy.ssafit.app.reply.service.ReplyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;
import java.util.UUID;
import net.coobird.thumbnailator.Thumbnails;
@RestController
@RequestMapping("/board")
//@Api("Board Controller API v1")
public class BoardController {

    private static final Logger logger = LoggerFactory.getLogger(BoardController.class);

    private BoardService boardService;
    private ReplyService replyService;

    @Autowired
    public BoardController(BoardService boardService, ReplyService replyService) {
        this.boardService = boardService;
        this.replyService = replyService;
    }
//    @GetMapping("/{boardId}")
////    @ApiOperation(value = "게시판 ID로 게시글 조회", notes = "입력한 게시판 ID(boardId)에 해당하는 모든 게시글(Post)을 조회한다.", response = Post.class)
//    public ResponseEntity<List<BoardRespDto>> getBoardListByBoardId(@PathVariable("boardId") long boardId) throws Exception {
////    public ResponseEntity<List<Post>> getPostListByBoardId(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) int boardId) throws Exception {
//        logger.info("Called getBoardListByBoardId. boardId: {}", boardId);
//
//        PostSearchCriteria criteria = new PostSearchCriteria();
//        if (boardId == 0) boardId = 1;
//        criteria.setBoardId(boardId);
//        return new ResponseEntity<List<BoardRespDto>>(boardService.search(criteria), HttpStatus.OK);
//    }

//    만약 공지사항, 질문글, 운동 루틴 공유글이라면 Board ,, 그룹 페이지 (그룹 모집글, 그룹 현황)은 별도로 ...?
    @GetMapping("/{boardId}")
//    @ApiOperation(value = "게시글 ID로 게시글 조회", notes = "입력한 게시글 ID(boardId)에 해당하는 게시글(Board) 1개를 조회한다.", response = BoardRespDto.class)
    public ResponseEntity<BoardRespDto> getBoard(@PathVariable("boardId") long boardId) throws Exception {
//    public ResponseEntity<List<Post>> getBoard(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) int boardId, @PathVariable("postId") @ApiParam(value = "게시글 ID", required = true) int postId) throws Exception {
        logger.info("Called getBoard. boardId: {}", boardId);


        return new ResponseEntity<BoardRespDto>(boardService.view(boardId), HttpStatus.OK);
    }

    //    imagePath 확인 필요
//    게시글 생성시 -> 공지사항(관리자) 커뮤니티(질문글, 운동 루틴 공유), 그룹 페이지(그룹 현황, 그룹 모집글)
    @PostMapping(value = "/post")
//    @ApiOperation(value = "게시글 생성", notes = "입력한 정보로 새로운 게시글을 생성한다.")
    public ResponseEntity<Boolean> postPost(@RequestBody BoardReqDto board) throws Exception {
//    public ResponseEntity<Boolean> postPost(@RequestBody BoardReqDto board, @RequestParam(value = "files", required = false) List<MultipartFile> files, @Value("${file.path.upload-images}") String imagePath) throws Exception {
//    public ResponseEntity<Boolean> postPost(@ApiParam(value = "게시글 정보", required = true) Post post, @RequestParam(value = "files", required = false) List<MultipartFile> files, @Value("${file.path.upload-images}") String imagePath) throws Exception {
//        logger.info("Called registBoard. board: {}, files: {}", board, files);
        logger.info("Called registBoard. board: {}", board);

//        if (!files.isEmpty()) {
////            String today = new SimpleDateFormat("yyMMdd").format(new Date());
//            String saveFolder = imagePath; // + File.separator + today;
//            logger.debug("저장 폴더 : {}", saveFolder);
//            File folder = new File(saveFolder);
//            if (!folder.exists())
//                folder.mkdirs();
//            int idx = 0;
//            for (MultipartFile mfile : files) {
//                idx++;
//                String originalFileName = mfile.getOriginalFilename();
//                if (!originalFileName.isEmpty()) {
//                    String saveFileName = UUID.randomUUID().toString()
//
//                            + originalFileName.substring(originalFileName.lastIndexOf('.'));
//                    logger.debug("원본 파일 이름 : {}, 실제 저장 파일 이름 : {}", mfile.getOriginalFilename(), saveFileName);
//
//                    File saveFile = new File(folder, saveFileName);
//                    mfile.transferTo(saveFile);
//
//                    File thumbnailFile = new File(saveFolder, "s_" + saveFileName);
//                    BufferedImage bo_img = ImageIO.read(saveFile);
//                    double ratio = 3;
//                    int width = (int) (bo_img.getWidth() / ratio);
//                    int height = (int) (bo_img.getHeight() / ratio);
//
//                    Thumbnails.of(saveFile).size(width, height).toFile(thumbnailFile);
////                    file 저장
////                    boardService.saveFile();
//
//                }
//            }
//            boardService.regist(board); // 수정
//        }
        boardService.regist(board);
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @PutMapping("/{boardId}/modify")
//    @ApiOperation(value = "게시글 수정", notes = "입력한 정보로 기존  게시글을 수정한다.")
    public ResponseEntity<Boolean> modifyBoard(@RequestBody BoardReqDto board) throws Exception {
//    public ResponseEntity<Boolean> modifyBoard(@RequestBody @ApiParam(value = "게시글 정보", required = true) BoardReqDto board) throws Exception {
        logger.info("Called modifyBoard. board: {}", board);
        boardService.modify(board);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

    @DeleteMapping("/{boardId}/delete")
//    @ApiOperation(value = "게시글 삭제", notes = "입력한 게시글 ID에 해당하는 게시글을 삭제한다. 리뷰 게시판의 경우 관련 데이터도 함께 삭제되며, 게시판의 종류와 상관 없이 게시글에 대해 작성된 모든 댓글도 함께 삭제된다.")
    public ResponseEntity<Boolean> deleteBoard(@PathVariable("boardId") long boardId) throws Exception {
//    public ResponseEntity<Boolean> deleteBoard(@PathVariable("boardId") @ApiParam(value = "게시판 ID", required = true) long boardId) throws Exception {
        logger.info("Called deleteBoard. boardId: {}", boardId);
        boardService.delete(boardId);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }

//    루틴 다운로드
    @GetMapping("/{boardId}/downloads")
    public ResponseEntity<CommonResp> downloadRoutine(@RequestBody BoardReqDto board){
        // board에 포함된 routine_id 추출
        // routine_in_user에 추가
        return new ResponseEntity<CommonResp>(HttpStatus.OK);
    }

//        게시글 좋아요
//    좋아요 누른 게시글 내 목록에서 보기 ... ^^ -> DB 추가
//    @GetMapping("/{boardId}/likes")
//    public ResponseEntity<BoardRespDto>


}
