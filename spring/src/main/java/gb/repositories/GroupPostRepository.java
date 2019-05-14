package gb.repositories;

import gb.domain.GroupPost;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupPostRepository extends CrudRepository<GroupPost, Long> {
    List<GroupPost> findByGroupIdentifier(String id);
    GroupPost findByGroupSequence(String gp_id);

}
