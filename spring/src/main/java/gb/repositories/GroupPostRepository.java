package gb.repositories;

import gb.domain.GroupPost;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupPostRepository extends CrudRepository<GroupPost, Long> {
}
